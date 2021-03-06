// Server config
export const __prod__ = process.env.NODE_ENV === 'production';
export const __port__ = process.env.PORT || 5000;

// Database config
export const __mongoUrl__ = 'mongodb://localhost:27017/ts3-cm';

// TS3 config
export const __ts3Host__ = 'localhost';
export const __ts3Port__ = 9987;
export const __ts3Username__ = 'serveradmin';
export const __ts3Password__ = process.env.TEAMSPEAK_SERVERQUERY_PASSWORD;
export const __ts3Nickname__ = 'TS3 Channel Manager';

export const __rootChannelId__ = 'asd';
export const __maxChannelsPerUser__ = 3;

// Others
export const __authKeyLifetime__ = 30; // Time in minutes
