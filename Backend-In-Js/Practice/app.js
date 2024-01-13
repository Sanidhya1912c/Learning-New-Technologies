const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const shopRoutes = require("./routes/shop");
const getPageNotFound = require("./controllers/404");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoutes);

app.use("/", getPageNotFound);

app.listen(3000);
