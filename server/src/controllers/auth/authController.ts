import passport from 'passport'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import User from '../../models/user/User'


const logout = (req: Request, res: Response) => {
    req.logout();
    res.send('logged out');
};

const login = passport.authenticate('local')

const signup = async (req : Request, res : Response) => {
    const { email, password } = req.body;

    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findByEmail(email)
    if (existingUser)
        return res.status(409).send('User already exists')

    const newUser = new User()
    newUser.email = email
    newUser.setPassword(password)
    
    return newUser.save() ?
        res.sendStatus(201) : res.sendStatus(500)
}

export default {
    login,
    signup,
    logout,
};
