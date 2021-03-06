import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { teamspeak } from '../../utils/ts3';
import crypto from 'crypto';
import User from '../../models/user';
import { __authKeyLifetime__ } from '../../utils/constants';
import jwt from 'jsonwebtoken';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/key', body('ts3Uid').notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const ts3Uid = req.body.ts3Uid;
    const ts3User = await teamspeak.getClientByUid(ts3Uid);

    if (!ts3User)
      return res.status(404).send('Could not find a client with that UID');

    const key = crypto.randomBytes(8).toString('hex');
    const dbUser = await User.findOne({ ts3Uid: ts3Uid }).exec();

    if (dbUser) {
      dbUser.loginKey = key;
      await dbUser.save();
    } else {
      const user = new User({ ts3Uid: ts3Uid, loginKey: key });
      await user.save();
    }

    ts3User.message(`Your auth key: ${key}`);
    return res.send('Successfully sent auth key to client');
  });

  route.post(
    '/login',
    body('ts3Uid').notEmpty(),
    body('key').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { ts3Uid, key } = req.body;
      const dbUser = await User.findOne({ ts3Uid: ts3Uid }).exec();

      if (!dbUser)
        return res.status(404).send('Could not find a db user with that UID');

      if (dbUser.loginKey != key)
        return res.status(400).send('The auth key is wrong');

      // Lifetime in min * (60 * 1000)
      if (Date.now() - dbUser.updatedAt.getTime() > __authKeyLifetime__ * 60000)
        return res.status(400).send('The auth key has expired');

      // Login done => authenticate user
      const accessToken = jwt.sign(ts3Uid, process.env.JWT_SECRET);

      return res.json({
        accessToken: accessToken,
      });
    }
  );
};
