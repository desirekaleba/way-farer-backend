/* eslint-disable no-undef */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';

import User from '../models/user';

const api = supertest(app);

const apiURLPrefixVersion = process.env.API_PREFIX_VERSION;

beforeAll(async () => {
  // Connect to a Mongo DB
  const dbURL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_DB_URL
    : process.env.MONGO_DB_URL;
    
  await mongoose.connect(dbURL, 
    { useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true 
    }
  );
});

describe('Register endpoint', () => {
  test('Should return json', async () => {

    const newUser = {
      firstName: 'Desire',
      lastName: 'Kaleba',
      userName: 'desirekaleba',
      password: '123456',
      email: 'desirekaleba@gmail.com',
      isAdmin: true,
      city: 'Kampala',
      country: 'Uganda',
        
    };
    await User.findOneAndDelete({ email: newUser.email });
    await api
      .post(`${apiURLPrefixVersion}/register`)
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 30000);
});

afterAll(() => {
  mongoose.connection.close();
});