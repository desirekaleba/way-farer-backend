import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import registerRouter from './routes/register';

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));

const apiURLPrefixVersion = process.env.API_PREFIX_VERSION;

app.use(`${apiURLPrefixVersion}/register`, registerRouter);

const dbURL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_DB_URL
  : process.env.MONGO_DB_URL;

mongoose.connect(dbURL, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
  }
).then(() => console.log('Db connection success'))
  .catch(err => console.error(err));


export default app;
