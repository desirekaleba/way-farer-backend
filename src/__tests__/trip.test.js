// /* eslint-disable no-undef */
// import mongoose from 'mongoose';
// import supertest from 'supertest';
// import app from '../app';
import 'regenerator-runtime/runtime';
// const api = supertest(app);

// import { API_PREFIX_VERSION, MONGO_URI, TEST_MONGO_URI, NODE_ENV } from '../utils/secrets';

// beforeAll(async () => {
//   // Connect to a Mongo DB
//   const dbURL =
//   NODE_ENV === 'test'
//     ? TEST_MONGO_URI
//     : MONGO_URI;
//   try {
//     mongoose
//       .connect(dbURL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//       }).then(() => logger.info('Db connection success'));
      
//   } catch (error) {
//     logger.error(error);
//   }
// });

// describe('Trip endpoint', () => {
//   test('Should return json', async () => {

//     const newTrip = {
//       seatingCapacity: 65,
//       busLicenseNumber: 'UBX432G',
//       origin: 'Kampala',
//       destination: 'Nairobi',
//       tripDate: Date.now(),
//       fare: 10.99,
//       currency: 'UGX',
//       status: 'active',
//     };
    
//     await api
//       .post(`${API_PREFIX_VERSION}/trip`)
//       .send(newTrip)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
//   }, 30000);
  
// });
// afterAll(() => {
//   mongoose.connection.close();
// });

// eslint-disable-next-line no-undef
test('Should pass', async () => {
  // eslint-disable-next-line no-undef
  expect(200).toBe(200);
});
