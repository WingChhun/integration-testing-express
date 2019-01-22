const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BookController = require("../controllers/bookController");

router.get("/", BookController.getBooks);
router.post("/", BookController.postBook);

router.get("/:id", BookController.getBook);

router.delete("/:id", BookController.deleteBook);
router.put("/:id", BookController.updateBook);

module.exports = router;