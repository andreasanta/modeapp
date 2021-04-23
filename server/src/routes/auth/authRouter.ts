import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import _ from 'lodash'
import authController from '../../controllers/auth/authController'

const authRouter = express.Router()

authRouter.get('/logout', authController.logout)
authRouter.post('/login', authController.login, async (req : Request, res : Response) => {
    return res.json(_.omit(req.user, ['password']))
})
authRouter.post('/signup',
            body('email').isEmail(),
            body('password').isLength({min: 4}),
            authController.signup)

export default authRouter
