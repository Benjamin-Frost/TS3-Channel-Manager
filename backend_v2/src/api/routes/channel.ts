import { Request, Response, NextFunction, Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
  __maxChannelsPerUser__,
  __rootChannelId__,
} from '../../utils/constants';
import { teamspeak } from '../../utils/ts3';
import Channel from '../../models/channel';

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

  route.get('/all', async (_req, res) => {
    const channels = await teamspeak.channelList();
    return res.json(channels);
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

      if (channelAmount > __maxChannelsPerUser__)
        return res
          .status(403)
          .send('You reached the max amount of allowed channels');

      // Find the lowest available channel num
      const channels = await Channel.find(
        {},
        { sort: { channelNum: 'asc' } }
      ).exec();

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
