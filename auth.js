const { google: { auth: { JWT } } } = require('googleapis');
require('dotenv').config();

const CLIENT_EMAIL = process.env.CLIENT_EMAIL
const CLIENT_PRIVATE_KEY = process.env.CLIENT_PRIVATE_KEY.split('\\n').join('\n')
const SCOPES = 'https://www.googleapis.com/auth/calendar';

module.exports = new JWT(
    CLIENT_EMAIL,
    null,
    CLIENT_PRIVATE_KEY,
    SCOPES
);