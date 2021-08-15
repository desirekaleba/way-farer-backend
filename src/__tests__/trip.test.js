/* eslint-disable no-undef */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';

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

describe('Trip endpoint', () => {
  test('Should return json', async () => {

    const newTrip = {
      seatingCapacity: 65,
      busLicenseNumber: 'UBX432G',
      origin: 'Kampala',
      destination: 'Nairobi',
      tripDate: Date.now(),
      fare: 10.99,
      currency: 'UGX',
      status: 'active',
    };
    
    await api
      .post(`${apiURLPrefixVersion}/trip`)
      .send(newTrip)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 30000);
  
});
afterAll(() => {
  mongoose.connection.close();
});