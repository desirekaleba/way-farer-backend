import express from 'express';
const router = express.Router();
import bookingController from '../controllers/booking';

router.post('/:tripId/:userId/book', bookingController.book);
router.get('/', bookingController.getAllBookings);
router.patch('/:bookingId/cancel', bookingController.cancelBooking);
router.get('/:bookingId', bookingController.getBookingById);

export default router;
