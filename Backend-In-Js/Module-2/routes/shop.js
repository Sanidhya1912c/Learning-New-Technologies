const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/' , shopController.getShop)

router.get('/product', shopController.getProductsList);

router.get('/cart' , shopController.getCart)

module.exports = router;
