import express from 'express';
const router = express.Router();

import authController from '../controllers/auth';
import checkUserExist from '../middlewares/checkUserExist';
import { loginValidator, registerValidator } from '../validators/auth';
import { asyncHandler } from '../middlewares/asyncHandler';

router.route('/login').post(loginValidator, asyncHandler(authController.login));
router.route('/register').post(registerValidator, asyncHandler(checkUserExist), asyncHandler(authController.register));

export default router;
