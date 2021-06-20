import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trip',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
bookingSchema.set('toJSON', {
  virtuals: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
