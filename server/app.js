const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 8080;
const ROUTES_BOOK = require('./routes/book');
const KEYS = require("./config/keys");

//Note: we load the db location from the JSON files

//Note: db options
const options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};

//Note: db connection

mongoose.connect(KEYS.DATABASE_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Note: don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {

    //Note: use morgan to log at command line

    //Note: 'combined' outputs the Apache style LOGs
    app.use(morgan('combined'));
}

//Note: parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

//Note: Routes
app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.use("/book", ROUTES_BOOK);

app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
});

module.exports = app; // for testingError: Source sample is missing.