import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  seatingCapacity: {
    type: Number,
    required: true,
  },
  busLicenseNumber: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  tripDate: {
    type: Date,
    default: Date.now
  },
  fare: {
    type: mongoose.Decimal128,
    required: true,
  },
  currency: {
    type: String,
    default: '$',
  },
  status: {
    type: String,
    default: 'active'
  },
  image: {
    type: String,
    default: ''
  },
});

tripSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
tripSchema.set('toJSON', {
  virtuals: true,
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;