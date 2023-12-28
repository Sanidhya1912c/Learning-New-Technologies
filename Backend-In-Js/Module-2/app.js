const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/add-product");

const userRouter = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')))


app.use("/admin", adminRouter);
app.use(userRouter);

app.use((req, res, next) =>
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
);

// app.use("/", (req, res, next) => {
//   console.log("This always run ");
//   next();
// });


app.listen(3000);
