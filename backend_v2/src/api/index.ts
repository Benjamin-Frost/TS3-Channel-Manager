import { Router } from 'express';
import AuthRoutes from './routes/auth';

export default () => {
  const app = Router();

  // Routes
  AuthRoutes(app);

  return app;
};
