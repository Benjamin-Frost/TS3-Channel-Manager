import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { __mongoUrl__, __port__ } from './utils/constants';
import routes from './api';

const app = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes());

mongoose.connect(__mongoUrl__, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('[server] Connected to database');

  app.listen(__port__, () => {
    console.log(`[server] Express listening on port ${__port__}`);
  });
});
