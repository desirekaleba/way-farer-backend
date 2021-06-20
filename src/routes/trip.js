import express from 'express';
const router = express.Router();
import tripController from '../controllers/trip';
import multer from 'multer';

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');
    isValid ? (uploadError = null) : uploadError;
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage });

router.post('/', uploadOptions.single('image'), tripController.addTrip);
router.get('/', tripController.getAllTrips);
router.get('/:tripId', tripController.getTripById);
router.patch('/:tripId', tripController.updateTrip);
router.delete('/:tripId/', tripController.cancelTrip);

export default router;
