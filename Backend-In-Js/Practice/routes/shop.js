const express = require("express");

const router = express.Router();

const shopControllers = require("../controllers/shop");

//All the get requests
router.get("/", shopControllers.getIndex);

router.get("/products", shopControllers.getProducts);

router.get("/cart", shopControllers.getCart);

router.get("/orders", shopControllers.getOrders);

//All the post request

module.exports = router;
