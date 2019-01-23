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

        //Note: start server

        runServer(TEST_PORT, DATABASE_URL).then(() => {
            console.log(`API-Books`, "Server has started");
        }).then(() => {
            //NOTE: Drop all data in the Book collection

            Book
                .remove({})
                .then(() => {
                    done();
                })
                .catch(err => console.log(err));
        }).catch(err => console.log(err))
    });

    //drop db and close server
    after((done) => {

        closeServer(TEST_PORT, DATABASE_URL).then(() => {
            console.log(`Api-books`, "Server has ended");

            done();

        }).catch(err => console.log(err));

    })

    describe(`POST routes`, () => {

        //Note: Remove all in db
        after((done) => {

            Book
                .remove()
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

                chai
                    .request(app)
                    .get("/book")
                    .then((res) => {

                        expect(res.body[0]._id)
                            .to
                            .equal(bookID);

                        expect(res.body[0].title)
                            .to
                            .be
                            .a(`string`);

                        expect(res.body[0].title)
                            .to
                            .equal(testBook.title)

                        done();
                    })
                    .catch(err => console.log(err));
            })

            it(`Should return a single book GET /:id `, (done) => {

                const bookURL = `/book/${bookID}`;

                chai
                    .request(app)
                    .get(bookURL)
                    .then((res) => {

                        expect(res.body._id)
                            .to
                            .equal(`${bookID}`);

                        expect(res.body.title)
                            .to
                            .equal(testBook.title);

                        done();

                    });

            });
        });

    }) //* End POST and get routes

    describe(`DETLETE routes`, () => {
        bookID = null;

        //Note: Create a book in the DB before testing Delete
        before((done) => {
            chai
                .request(app)
                .post("/book")
                .send(testBook)
                .then(res => {

                    bookID = res.body.book._id;
                    done();
                })
                .catch(err => console.log(err));
        });

        it(`Should delete a book given an id`, () => {

            const successMessage = `Book successfully deleted!`;

            chai
                .request(app)
                .delete(`/book/${bookID}`)
                .then(res => {

                    expect(res.statusCode)
                        .to
                        .equal(200);

                    expect(res.body.message)
                        .to
                        .equal(successMessage);

                    done();
                })
                .catch(err => console.log(err));

        });

    }); //* End delete route

    describe(`PUT routes`, () => {
        bookID = null;
        //Note: Create a book in the DB before testing Delete
        before((done) => {
            chai
                .request(app)
                .post("/book")
                .send(testBook)
                .then(res => {

                    bookID = res.body.book._id;
                    done();
                })
                .catch(err => console.log(err));
        });

        it(`Should update book`, () => {

            const success = 'Book updated';
            const updatedBook = {
                ...testBook,
                title: "New book"
            };

            chai
                .request(app)
                .put(`/book/${bookID}`)
                .send(updatedBook)
                .then(res => {

                    expect(res.statusCode)
                        .to
                        .equal(200);

                    expect(res.body.message)
                        .to
                        .equal(success);

                    done();
                })
                .catch(err => console.log(err));

        });
    })

});
