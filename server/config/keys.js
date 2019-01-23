require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || '';

const PORT = process.env.PORT || 5000;
const TEST_PORT = 8080;
module.exports = {

    DATABASE_URL,
    PORT,
    TEST_PORT
};