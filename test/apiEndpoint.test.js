const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');
const app = require("../server/app");
const {runServer, closeServer} = require("../server/server");
const expect = chai.expect;
const KEYS = require("../server/config/keys");
//* Use chaiHTTP
chai.use(chaiHttp);

const {PORT, DATABASE_URL, TEST_PORT} = KEYS;

describe(`Generic API endpoint`, () => {

    //Note: start server before and end after

    it(`Should start server `, () => {
        const res = chai
            .request(app)
            .get("/")
            .then(res => {

                expect(res.status)
                    .to
                    .equal(200);
            });

    });

});
