const fs = require("fs");
const Path = require("path");

const path = Path.join(
  Path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFormFile = (cb) => {
  fs.readFile(path, (err, fileContent) => {
    if (err) return cb([]);
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFormFile((products) => {
      products.push(this);
      fs.writeFile(path, JSON.stringify(products), (err) => console.log(err));
    });
  }

  static fetchAll(cb) {
    getProductsFormFile(cb);
  }
};
