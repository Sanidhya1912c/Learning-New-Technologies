const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65abaeea541635907b02e8e1")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const newUser = new User({
          name: "Max",
          email: "max@example",
          cart: {
            items: [],
          },
        });
        newUser.save();
      }
    });
    
    app.listen(3000);
  })
  .catch((err) => console.log(err));
