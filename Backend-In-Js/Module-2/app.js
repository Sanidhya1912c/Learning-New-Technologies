const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminData = require("./routes/add-product");

const userRouter = require("./routes/shop");

const pageController = require("./controllers/routing");

const app = express();

app.set("view engine", "ejs"); //Tamplating Engine
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.router);
app.use(userRouter);

app.use(pageController.errorPage);

app.listen(3000);
