import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';

const route = Router();

export default (app: Router) => {
  app.use('/channel', route);
};

interface JwtPayload {
  ts3Uid: string;
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Missing bearer token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.ts3Uid = (decoded as JwtPayload).ts3Uid;
    next();
  } catch (error) {
    return res.status(403).send('Invalid access token');
  }
}
