import Trip from '../models/trip';
import { BAD_REQUEST, NOT_FOUND, OK } from '../constants/statusCode';

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});

    if (trips) {
      return res.status(OK).json({
        status: 'success',
        data: trips,
      });
    } else {
      return res.status(NOT_FOUND).json({
        status: 'failed',
        message: 'No trip found',
      });
    }
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      status: 'false',
      message: err,
    });
  }
};

const getTripById = async (req, res) => {
  try {
    const tripId = req.params.tripId;

    const trip = await Trip.findById(tripId);
    if (trip) {
      return res.status(OK).json({
        status: 'success',
        data: trip,
      });
    } else {
      return res.status(NOT_FOUND).json({
        status: 'failed',
        message: `Cannot find trip with ID ${tripId}`,
      });
    }
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      message: err,
    });
  }
};

const cancelTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findByIdAndRemove(tripId);
    return res.status(OK).json({
      status: 'success',
      data: {
        message: 'Trip cancelled',
        trip,
      },
    });
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      message: err,
    });
  }
};

const updateTrip = async (req, res) => {
  try {
    const file = req.file;
    const { fileName } = file || { fileName: '' };
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
    const {
      seatingCapacity,
      busLicenseNumber,
      origin,
      destination,
      tripDate,
      fare,
      currency,
      status,
    } = req.body;

    const updateTrip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      {
        seatingCapacity,
        busLicenseNumber,
        origin,
        destination,
        tripDate,
        fare,
        currency,
        status,
        image: `${basePath}${fileName}`,
      },
      { new: true }
    );

    if (!updateTrip) {
      return res.status(BAD_REQUEST).json({
        status: 'failed',
        data: {
          message: 'Cannot Update trip now',
        },
      });
    } else {
      res.status(OK).json({
        status: 'success',
        data: updateTrip,
      });
    }
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      data: {
        message: error,
      },
    });
  }
};

const addTrip = async (req, res) => {
  try {
    const file = req.file;
    const { fileName } = file || { fileName: '' };
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
    const {
      seatingCapacity,
      busLicenseNumber,
      origin,
      destination,
      tripDate,
      fare,
      currency,
      status,
    } = req.body;
    const trip = new Trip({
      seatingCapacity,
      busLicenseNumber,
      origin,
      destination,
      tripDate,
      fare,
      currency,
      status,
      image: `${basePath}${fileName}`,
    });

    const saveTrip = await trip.save();

    if (!saveTrip) {
      return res.status(BAD_REQUEST).json({
        status: 'failed',
        data: {
          message: 'Cannot create trip now',
        },
      });
    } else {
      res.status(OK).json({
        status: 'success',
        data: saveTrip,
      });
    }
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: 'failed',
      data: {
        message: error,
      },
    });
  }
};

export default {
  addTrip,
  getAllTrips,
  getTripById,
  cancelTrip,
  updateTrip,
};
