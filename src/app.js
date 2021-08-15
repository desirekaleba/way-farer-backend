import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';
import logger from './utils/logger';



const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs/logs.log'), {
  flags: 'a',
});
app.use(morgan('combined', {
  stream: accessLogStream
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

import { API_PREFIX_VERSION, MONGO_URI, TEST_MONGO_URI, NODE_ENV } from './utils/secrets';

const dbURL =
  NODE_ENV === 'test'
    ? TEST_MONGO_URI
    : MONGO_URI;
try {
  mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }).then(() => logger.info('Db connection success'));
  
} catch (error) {
  logger.error(error);
}

  
import { SERVER_ERROR } from './constants/statusCode';




app.use(`${API_PREFIX_VERSION}`, routes);


// 404 error handler
app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render 404 page
  res.status(error.status || SERVER_ERROR);
  res.send({
    error: error.message,
  });
  next();
});

export default app;
