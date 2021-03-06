declare global {
  namespace Express {
    interface Request {
      ts3Uid: string;
    }
  }
}

export {};
