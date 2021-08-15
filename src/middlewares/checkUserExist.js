import User from '../models/user';

import { BAD_REQUEST } from '../constants/statusCode';

const checkUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(BAD_REQUEST).json({
      status: 'error',
      message: 'User already exists'
    });
  }
  next();
};

export default checkUser;
