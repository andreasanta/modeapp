import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User, { IUser } from '../../models/user/User';

passport.use(new LocalStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'
    },
    async (email : string, password : string, done : CallableFunction) => {
        
        const user = await User.findByEmail(email)
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' })
        }

        // console.log(user)
  
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }

        return done(null, user);
    })
  )

passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id: number, done) => {
    const user = await User.findById(id)

    if (!user) {
        done('user not found')
    }

    done(null, user);
});

export default passport;
