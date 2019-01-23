const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require("../server/app");
const {runServer, closeServer} = require("../server/server");
const expect = chai.expect;
const KEYS = require("../server/config/keys");
const testBook = require("./test-data/books");
const Book = require("../server/models/book");
//* Use chaiHTTP
chai.use(chaiHttp);

const {PORT, DATABASE_URL, TEST_PORT} = KEYS;

//Note: Add a book to the collection for testing
let bookID = null;

//NOTE: Server should be running before starting the tests
describe(`API Books`, () => {

    //Note: start server before and end after
    let bookId = null;

    before((done) => {

        //NOTE: Drop all data in the Book collection

        Book
            .remove({})
            .then(() => {
                done();
            })
            .catch(err => console.log(err));

    });

    //drop db and close server
    after((done) => {

        //Note: Remove all
        Book
            .remove({})
            .then(() => {
                done();
            })
            .catch(err => console.log(err));
    })

    describe(`POST routes`, () => {
        before((done) => {
            //$ Create a book
            Book
                .remove({})
                .then(() => done());
        })

        after((done) => {
            Book
                .remove({})
                .then(() => done());
        })

        it(`Should create a book`, (done) => {

            const successMessage = `Book successfully added!`;

            chai
                .request(app)
                .post("/book")
                .send(testBook)
                .then((res) => {

                    bookID = res.body.book._id;

                    expect(res.statusCode)
                        .to
                        .equal(200);
                    expect(res.body.message)
                        .to
                        .equal(successMessage)
                    done();
                });
        })

        describe(`GET routes`, () => {

            it(`Should return all books GET /book route`, (done) => {

                return chai
                    .request(app)
                    .get("/book")
                    .then((res) => {

                        expect(res.body.length)
                            .to
                            .equal(1);

                        expect(res.body[0].title)
                            .to
                            .be
                            .a(`string`);

                    })
                    .catch(err => console.log(err));
            })

            it(`Should return a single book GET /:id `, (done) => {

                const bookURL = `/book/${bookID}`;

                return chai
                    .request(app)
                    .get(bookURL)
                    .then((res) => {
                        console.log("res.body", res.body);

                        console.log('\n\nbookID', bookID);

                        expect(res.body._id)
                            .to
                            .equal(`${bookID}`);

                    });

            });
        });

    })

});
