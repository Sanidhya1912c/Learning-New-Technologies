const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();


router.get("/add-product", productsController.getAddProducts);

router.post("/shop", productsController.postAddProducts);

exports.router = router;
