import Joi from 'joi';
import validatorHandler from '../middlewares/validatorHandler';

export const registerValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().trim().alphanum().min(3).max(30).required(),
    lastName: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .required(),
    city: Joi.string(),
    country: Joi.string(),
    isAdmin: Joi.bool(),
  });

  validatorHandler(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .min(6)
      .required(),
  });
  validatorHandler(schema, req, res, next);
};
