import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generate } from '../utils/token';
import { NOT_FOUND, OK, SERVER_ERROR, UNAUTHORIZED } from '../constants/statusCode';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(NOT_FOUND).json({
      status: 'failed',
      data: {
        message: 'User not found!',
      },
    });
  }

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = generate(user._id);
    res.status(OK).json({
      status: 'success',
      data: {
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
    });
  } else {
    res.status(UNAUTHORIZED).json({
      status: 'failed',
      data: {
        message: 'Wrong password!',
      },
    });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, password, email, isAdmin, city, country } =
      req.body;
  
  const user = new User({
    firstName,
    lastName,
    passwordHash: bcrypt.hashSync(password, 12),
    email,
    isAdmin,
    city,
    country,
  });
  
  let saveUser;
  saveUser = await user.save();
  if (!saveUser) {
    return res.status(SERVER_ERROR).json({
      status: 'failed',
      data: {
        message: 'Cannot create the user now',
      },
    });
  } else {
    const token = generate(saveUser._id);
    res.status(OK).json({
      status: 'success',
      data: {
        token,
        firstName: saveUser.firstName,
        lastName: saveUser.lastName,
        email: saveUser.email
      },
    });
  }
};

export default {
  login,
  register
};
