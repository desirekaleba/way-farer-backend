import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  const { email, password } = req.body;

  const secret = process.env.SECRET;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      status: 'failed',
      data: {
        message: 'User not found!',
      },
    });
  }

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.Admin,
        email: user.email,
      },
      secret,
      { expiresIn: '1d' }
    );
    res.status(200).json({
      status: 'success',
      data: {
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        city: user.city,
        country: user.country,
      },
    });
  } else {
    res.status(400).json({
      status: 'failed',
      data: {
        message: 'Wrong password!',
      },
    });
  }
};

export default login;
