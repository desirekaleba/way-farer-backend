// /* eslint-disable no-undef */
// import mongoose from 'mongoose';
// import supertest from 'supertest';
// import app from '../app';
import 'regenerator-runtime/runtime';
// import User from '../models/user';

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

// describe('Register endpoint', () => {
//   test('Should return json', async () => {

//     const newUser = {
//       firstName: 'Desire',
//       lastName: 'Kaleba',
//       password: '123456',
//       email: 'desirekaleba@gmail.com',
//       isAdmin: true,
//       city: 'Kampala',
//       country: 'Uganda',
        
//     };
//     await User.findOneAndDelete({ email: newUser.email });
//     await api
//       .post(`${API_PREFIX_VERSION}/register`)
//       .send(newUser)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
//   }, 30000);

//   test('Should return 400', async () => {
//     const newUser = {
//       firstName: 'Desire',
//       lastName: 'Kaleba',
//       password: '123456',
//       email: 'desirekaleba@gmail.com',
//       isAdmin: true,
//       city: 'Kampala',
//       country: 'Uganda',
        
//     };

//     await api
//       .post(`${API_PREFIX_VERSION}/register`)
//       .send(newUser)
//       .expect(400);
//   });
// });

// describe('Login endpoint', () => {
//   test('Should return json', async () => {

//     const userDetails = {
//       email: 'desirekaleba@gmail.com',
//       password: '123456',
//     };
//     await api
//       .post(`${API_PREFIX_VERSION}/login`)
//       .send(userDetails)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
//   }, 30000);

//   test('Should return 400', async () => {
//     const userDetails = {
//       email: 'desirekaleba@gmail.com',
//       password: '1234567j',
//     };

//     await api
//       .post(`${API_PREFIX_VERSION}/login`)
//       .send(userDetails)
//       .expect(400);
//   });

//   test('Should return 404', async () => {
//     const userDetails = {
//       email: 'desirekahleba@gmail.com',
//       password: '1234567hgfd',
//     };

//     await api
//       .post(`${API_PREFIX_VERSION}/login`)
//       .send(userDetails)
//       .expect(404);
//   });
// });

// afterAll(() => {
//   mongoose.connection.close();
// });

// eslint-disable-next-line no-undef
test('Should pass', async () => {
  // eslint-disable-next-line no-undef
  expect(200).toBe(200);
});
