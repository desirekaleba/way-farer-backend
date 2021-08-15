import Booking from '../models/booking';
import { BAD_REQUEST, NOT_FOUND, OK } from '../constants/statusCode';

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    if (bookings) {
      return res.status(OK).json({
        status: 'success',
        data: bookings,
      });
    } else {
      return res.status(NOT_FOUND).json({
        status: 'failed',
        message: 'No booking found',
      });
    }
  } catch (err) {
    return res.staus(BAD_REQUEST).json({
      status: 'failed',
      message: err,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (booking) {
      return res.status(OK).json({
        status: 'success',
        body: booking,
      });
    } else {
      return res.status(NOT_FOUND).json({
        status: 'failed',
        message: `Cannot find booking with ID ${bookingId}`,
      });
    }
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      message: err,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByIdAndRemove(bookingId);
    return res.status(OK).json({
      status: 'success',
      data: {
        message: 'Booking cancelled',
        booking,
      },
    });
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      message: err,
    });
  }
};
const book = async (req, res) => {
  try {
    const { tripId, userId } = req.params;
    const booking = new Booking({
      tripId,
      userId,
    });

    const saveBooking = await booking.save();

    if (!saveBooking) {
      return res.status(BAD_REQUEST).json({
        status: 'failed',
        data: {
          message: 'Cannot book trip now',
        },
      });
    } else {
      return res.status(OK).json({
        status: 'success',
        data: saveBooking,
      });
    }
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      message: err,
    });
  }
};

export default {
  book,
  getAllBookings,
  getBookingById,
  cancelBooking,
};
