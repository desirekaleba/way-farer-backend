import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  }
});

userSchema.virtual('id').get(() => this._id.toHexString());

userSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('User', userSchema);

export default User;