require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || '';

const PORT = process.env.PORT || 5000;

module.exports = {

    DATABASE_URL,
    PORT
};