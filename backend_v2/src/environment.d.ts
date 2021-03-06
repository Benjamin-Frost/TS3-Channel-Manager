declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      JWT_SECRET: string;
      TEAMSPEAK_SERVERQUERY_PASSWORD: string;
    }
  }
  namespace Express {
    interface Request {
      ts3Uid: string;
    }
  }
}

export {};
