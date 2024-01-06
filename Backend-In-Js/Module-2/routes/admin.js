const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/--- get routes
router.get('/edit-product', adminController.getEditProduct);

router.get('/products', adminController.getProducts);

// /admin/-- post routes 
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/edit-product/:productId', adminController.getEditProductId);


module.exports = router;
