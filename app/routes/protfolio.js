const path = require('path')

const express = require('express')

const productController = require('../controllers/products');

const router = express.Router();

router.get("/portfolio/:id", productController.getProducts);

module.exports = router