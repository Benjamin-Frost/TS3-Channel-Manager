import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { teamspeak } from '../../utils/ts3';
import crypto from 'crypto';
import User from '../../models/user';

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
      console.log(user._id);
      await user.save();
    }

    ts3User.message(`Your auth key: ${key}`);
    return res.send('Successfully sent auth key to client');
  });
};
