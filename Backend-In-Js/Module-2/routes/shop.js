const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const adminData = require("./add-product");

const router = express.Router();

router.get("/", (req, res, next) => {
  const product = adminData.products;
  res.render("shop", {
    prods: product,
    pageTitle: "Shop",
    path: "/admin/shop",
  });
});

module.exports = router;
