const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require("../server/app");
const {runServer, closeServer} = require("../server/server");
const expect = chai.expect;
const KEYS = require("../server/config/keys");
const testBook = require("./test-data/books");
//* Use chaiHTTP
chai.use(chaiHttp);

const {PORT, DATABASE_URL, TEST_PORT} = KEYS;

describe(`API Books`, () => {

    //Note: start server before and end after

    before((done) => {
        runServer(TEST_PORT, DATABASE_URL).then(() => {
            return chai
                .request(app)
                .post("/book")
                .send(testBook);
        }).then(() => {
            done();
        })

    });

    //drop db and close server
    after((done) => {
        return mongoose
            .connection
            .dropDatabase()
            .then((dropped) => {
                if (dropped) {
                    return closeServer();
                } else {
                    throw new Error(`Database not dropped`);
                }
            })
            .then(done => done())
    });

    it(`Should have created a book POST /book with test Data sent`, () => {

        return chai
            .request(app)
            .get("/book")
            .then((res) => {
                console.log('res.body', res.body);

            })
    })

});