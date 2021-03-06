import { Request, Response, NextFunction, Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
  __maxChannelsPerUser__,
  __rootChannelId__,
} from '../../utils/constants';
import { teamspeak } from '../../utils/ts3';
import Channel, { IChannel } from '../../models/channel';
import HTTPError from '../../utils/http-error';
import { isValidObjectId } from 'mongoose';

const route = Router();

export default (app: Router) => {
  app.use('/channel', authMiddleware, route);

  route.get('/', async (req, res) => {
    const channels = await Channel.find({ ownerUid: req.ts3Uid }).exec();
    return res.json(channels);
  });

  route.get('/:id', async (req, res) => {
    const channel = await Channel.findById(req.params.id).exec();
    return res.json(channel);
  });

  route.post(
    '/create',
    body('channelName').isLength({ min: 5, max: 20 }),
    body('channelPassword').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { channelName, channelPassword } = req.body;

      // Check if user reached max allowed channels
      const channelAmount = await Channel.countDocuments({
        ownerUid: req.ts3Uid,
      }).exec();

      if (channelAmount >= __maxChannelsPerUser__)
        return res
          .status(403)
          .send('You reached the max amount of allowed channels');

      // Find the lowest available channel num
      const channels = await Channel.find({}, null, {
        sort: { channelNum: 1 },
      }).exec();

      let num = 0;
      let parentId = 0;
      for (; num < channels.length; ++num) {
        if (channels[num].channelNum != num) break;
        parentId = channels[num].channelId;
      }

      // Create channel on ts3 server
      const ts3Channel = await teamspeak.channelCreate(
        `[${num}] ${channelName}`,
        {
          channelPassword: channelPassword,
          channelFlagPermanent: true,
          cpid: __rootChannelId__,
          channelOrder: parentId,
        }
      );

      // Store channel in DB
      const dbChannel = new Channel({
        channelId: ts3Channel.cid,
        channelNum: num,
        channelName: channelName,
        ownerUid: req.ts3Uid,
      });

      await dbChannel.save();
      return res.send('Successfully created channel');
    }
  );

  route.delete('/:id', async (req, res) => {
    let channel;

    try {
      channel = await getChannelAndVerifyOwnership(req.params?.id, req.ts3Uid);
    } catch (error) {
      return res.status(error.statusCode).send(error.message);
    }

    // Delete channel on ts3 server
    await teamspeak.channelDelete(channel.channelId.toString(), true);

    // Delete channel in DB
    await channel.deleteOne();

    return res.send('Successfully deleted channel');
  });

  route.patch(
    '/:id',
    body('channelName').isLength({ min: 5, max: 20 }),
    body('channelPassword').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { channelName, channelPassword } = req.body;
      let channel;

      try {
        channel = await getChannelAndVerifyOwnership(
          req.params?.id,
          req.ts3Uid
        );
      } catch (error) {
        return res.status(error.statusCode).send(error.message);
      }

      // Update channel on ts3 server
      await teamspeak.channelEdit(channel.channelId.toString(), {
        channelName: `[${channel.channelNum}] ${channelName}`,
        channelPassword: channelPassword,
      });

      // Update channel in DB
      channel.channelName = channelName;
      await channel.save();

      return res.send('Successfully updated channel');
    }
  );
};

interface JwtPayload {
  ts3Uid: string;
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Missing bearer token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.ts3Uid = (decoded as JwtPayload).ts3Uid;
    next();
    return;
  } catch (error) {
    return res.status(403).send('Invalid access token');
  }
}

async function getChannelAndVerifyOwnership(
  dbChannelId: string | undefined,
  ts3Uid: string
): Promise<IChannel> {
  if (!isValidObjectId(dbChannelId)) throw new HTTPError(400, 'Invalid DB ID');
  const channel = await Channel.findById(dbChannelId).exec();
  if (!channel) throw new HTTPError(404, 'Channel not found');
  if (channel.ownerUid != ts3Uid)
    throw new HTTPError(403, 'You cannot delete others channels');
  return channel;
}
