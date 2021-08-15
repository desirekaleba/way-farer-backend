import express from 'express';
const router = express.Router();
import bookingController from '../controllers/booking';
import checkUserAuth from '../middlewares/checkUserAuth';

router.post('/:tripId/:userId/book', checkUserAuth, bookingController.book);
router.get('/', checkUserAuth, bookingController.getAllBookings);
router.patch('/:bookingId/cancel', checkUserAuth, bookingController.cancelBooking);
router.get('/:bookingId', checkUserAuth, bookingController.getBookingById);

export default router;
