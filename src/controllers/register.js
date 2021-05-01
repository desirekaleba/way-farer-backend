import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { firstName, lastName, password, email, isAdmin, city, country } = req.body;

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

  try {
    saveUser = await user.save();
  } catch (error) {
    // console.error(error);
  }
  if (!saveUser) {
    return res.status(400).json({
      status: 'failed',
      data: {
        message: 'Cannot create the user now'
      }
    });
  } else {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        userId: saveUser._id,
        isAdmin: saveUser.Admin,
        email: saveUser.email,
      },
      secret,
      { expiresIn: '1d' }
    );
    res.status(200).json({
      status: 'success',
      data: {
        token,
        firstName: saveUser.firstName,
        lastName: saveUser.lastName,
        email: saveUser.email,
        isAdmin: saveUser.isAdmin,
        city: saveUser.isAdmin,
        country: saveUser.country,
      }
    });
  }

};

export default register;