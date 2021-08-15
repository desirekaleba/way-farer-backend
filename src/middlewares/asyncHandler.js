
import { SERVER_ERROR } from '../constants/statusCode';

export const asyncHandler = (cb) => async (
  req, res, next
) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    return res.status(SERVER_ERROR).json({
      message: err.message
    });
  }
  return true;
};