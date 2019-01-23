const faker = require('faker');

const testBook = {
    title: faker
        .name
        .title(),
    author: faker
        .name
        .firstName(),
    year: faker
        .random
        .number({min: 2000, max: 2019}),
    pages: faker
        .random
        .number({min: 1, max: 1000})
}

module.exports = testBook;