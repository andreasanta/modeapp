import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import db from './config/database'

import keys from './config/keys'
import passport from './config/passport/passport'
import authRouter from './routes/auth/authRouter'
import userRouter from './routes/user/userRouter'

const app = express();

app.use(morgan('dev'));
app.use(
    session({
        secret: keys.system.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        name: 'modeapp',
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/user', passport.session(), userRouter);

app.use(express.static('public'))

app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port 4000');
});
