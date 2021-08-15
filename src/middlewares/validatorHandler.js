import { BAD_REQUEST } from '../constants/statusCode';

const validatorHandler = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(BAD_REQUEST).json({
      status: 'error',
      message: error.details[0].message.replace(/[^a-zA-Z0-9]/g, ' '),
    });
  }
  next();
};

export default validatorHandler;
