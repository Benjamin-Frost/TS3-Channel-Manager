# Contributing

First of all thanks a lot for taking the time to contributing to this project. I highly appreciate the effort :whale:

## Prerequisites

This app is based on the MERN Webstack. This means you need to install

- [<img src="https://nodejs.org/static/images/favicons/favicon.ico" width="16" height="16"> NodeJS](https://nodejs.org)
- [<img src="https://www.mongodb.com/assets/images/global/favicon.ico" width="16" height="16"> MongoDB](https://www.mongodb.com)

I would additionally recommend [<img src="https://code.visualstudio.com/favicon.ico" width="16" height="16"> Visual Studio Code](https://code.visualstudio.com) as Editor and [<img src="https://yarnpkg.com/favicon-32x32.png" width="16" height="16"> Yarn](https://yarnpkg.com/) as Package Manager.


### Working on backend

1. Open a terminal in `/backend` and run `yarn install` (or `npm install`)
2. Within `/backend` create a file with the name `.env` and insert the following content

```
TEAMSPEAK_SERVERQUERY_PASSWORD=<YOUR_TS3_SERVERYQUERY_PASSWORD_HERE>
JWT_SECRET=<RANDOM_SECURE_CHAR_SEQUENCE>
```

To generate the `JWT_SECRET` you can for example run the following command in a terminal

```
node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
```

3. Open `/backend/util/constants.ts` with your favorite Editor and change the variables to your needs. Most likely you have to change `__rootChannelId__`. This refers to the ID of the TS3 Channel that will be the root of all Channels created by the TS3-Channel-Manager.
5. You can now start the server by running `yarn dev` (or `npm run dev`)

### Working on frontend


1. Open a terminal in `/frontend` and run `yarn install` (or `npm install`)
2. You can now start the frontend by running `yarn start` (or `npm run start`)
