import express from 'express';
const router = express.Router();
import { NOT_FOUND, BAD_REQUEST } from '../constants/statusCode';

import authRouter from './auth';
import bookingRouter from './booking';
import tripRouter from './trip';

router.use('/auth', authRouter);
router.use('/booking', bookingRouter);
router.use('/trip', tripRouter);

router.all('*', (req, res) => {
  return res.status(NOT_FOUND).json({
    status: 'error',
    message: `${req.originalUrl} can't be found.`,
  });
});

router.use((err, req, res, next) => {
  res.status(BAD_REQUEST).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
  });
  next();
});
  
export default router;