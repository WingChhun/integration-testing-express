const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ROUTES_BOOK = require('./routes/book');
const KEYS = require("./config/keys");

const {PORT} = KEYS || 8080;

//Note: we load the db location from the JSON files

//Note: db connection

mongoose.connect(KEYS.DATABASE_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Note: don't show the log when it is test

app.use(morgan('dev'));

//Note: parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

//Note: Routes
app.get("/", (req, res) => res.status(200).json({message: "Welcome to our Bookstore!"}));

app.use("/book", ROUTES_BOOK);

app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
});

module.exports = app; // for testingError: Source sample is missing.