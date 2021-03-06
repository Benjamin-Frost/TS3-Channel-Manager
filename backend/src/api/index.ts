import { Router } from 'express';
import AuthRoutes from './routes/auth';
import ChannelRoutes from './routes/channel';

export default () => {
  const app = Router();

  // Routes
  AuthRoutes(app);
  ChannelRoutes(app);

  return app;
};
