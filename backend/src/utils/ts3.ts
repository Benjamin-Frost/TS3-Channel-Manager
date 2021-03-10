import { TeamSpeak } from 'ts3-nodejs-library';
import {
  __ts3Host__,
  __ts3Nickname__,
  __ts3Password__,
  __ts3Port__,
  __ts3Username__,
} from './constants';

export const teamspeak = new TeamSpeak({
  host: __ts3Host__,
  serverport: __ts3Port__,
  username: __ts3Username__,
  password: __ts3Password__,
  nickname: __ts3Nickname__,
});

teamspeak.on('ready', () => {
  console.log('[server] Connected to TS3 Server');
});

teamspeak.on('error', () => {
  console.log('[server] Error occured when trying to connect to TS3 Server');
});

teamspeak.on('close', async () => {
  console.log('[server] Connection to TS3 Server lost! Trying to reconnect...');
  await teamspeak.reconnect(-1, 5000);
});
