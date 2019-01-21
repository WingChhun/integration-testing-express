const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Note: Middleware configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Note: Comment header template

/*
@route: GET '/'
@params:
@desc:
@access: Public
*/

/*
@route: GET '/'
@params:
@desc:
@access: Public
*/
app.get("/", (req, res) => {
    res
        .status(200)
        .json({msg: " TEST ROUTE"});
})

app.get("*", (req, res) => {});

module.exports = app;