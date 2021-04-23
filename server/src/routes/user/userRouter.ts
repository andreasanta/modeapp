import express from 'express';
import { body } from 'express-validator'
import userController from '../../controllers/user/userController';

const userRouter = express.Router();

userRouter.get('/', userController.getUser)
userRouter.post('/topup', body('amount').isNumeric(), userController.topup)
userRouter.post('/transfer', body('amount').isNumeric(), body('email').isEmail(), userController.transfer)
userRouter.get('/transactions', userController.transactions)

export default userRouter;
