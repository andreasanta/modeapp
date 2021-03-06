import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const facebook = {
    clientId: process.env.FACEBOOK_APP_ID || '',
    clientSecret: process.env.FACEBOOK_APP_SECRET || '',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
};

const google = {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
};

const linkedIn = {
    clientId: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    callbackURL: process.env.LINKEDIN_CALLBACK_URL || '',
};

const pg = {
    connectionString: process.env.PG_CONNSTRING || 'postgresql://modeapp:modeapp@localhost/modeapp',
};

const clientURL =
    process.env.NODE_ENV === 'production'
        ? process.env.PROD_CLIENT_URL || ''
        : process.env.DEV_CLIENT_URL || '';
const serverURL =
    process.env.NODE_ENV === 'production'
        ? process.env.PROD_SERVER_URL || ''
        : process.env.DEV_SERVER_URL || '';

const system = {
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'verysecurecookiesecret'
}

export default {
    facebook,
    google,
    linkedIn,
    pg,
    clientURL,
    serverURL,
    system
};
