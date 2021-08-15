import dotenv from 'dotenv';
dotenv.config();
import logger from './logger';

const { 
  MONGO_URI, 
  TEST_MONGO_URI, 
  NODE_ENV, 
  JWT_SECRET_KEY, 
  API_PREFIX_VERSION } = process.env;

const requiredCreds = ['MONGO_URI', 'JWT_SECRET_KEY', 'API_PREFIX_VERSION'];

for (const cred of requiredCreds) {
  if (!process.env[cred]) {
    logger.error(`Missing required environment variable: ${cred}`);
    process.exit(1);
  }
}

export {
  MONGO_URI,
  NODE_ENV,
  JWT_SECRET_KEY,
  API_PREFIX_VERSION,
  TEST_MONGO_URI
};
