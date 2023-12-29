const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const adminData = require('./add-product')

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
  console.log(adminData.products)
});

module.exports = router;
