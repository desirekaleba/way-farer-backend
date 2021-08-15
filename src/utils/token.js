import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/statusCode';
import logger from './logger';
import { JWT_SECRET_KEY } from './secrets';
import User from '../models/user';

export const generate = (id) => {
  return jwt.sign(
    { id },
    JWT_SECRET_KEY,
    {
      expiresIn: '10d'
    }
  );
};

export const decode = (token, req, res, next) => {
  try {
    jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
      if (err || !decoded) {
        logger.error(err);
        return res.status(UNAUTHORIZED).json({
          status: 'failed',
          message: 'User not authorized.'
        });
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(UNAUTHORIZED).json({
          message: 'Invalid token'
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    logger.error(error.message);
  }
};
