const uniqueId = require("uniqid");
const db = require("../util/database");

const Cart = require("./cart");

const getProductsFormDatabase = (cb) => {
  db.execute("SELECT * FROM products")
    .then(([rows, fieldData]) => cb(rows))
    .catch((err = console.log(err)));
};

module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    const defaultPicture =
      "https://images.unsplash.com/photo-1591171291116-6310ea27c3f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl === "" ? defaultPicture : imageUrl;
  }

  save() {
    return db.execute(
      `INSERT INTO products (id,title,price,description,imageUrl) VALUES(?,?,?,?,?)`,
      [this.id, this.title, this.price, this.description, this.imageUrl]
    )
  }

  static deleteById(id) {
    getProductsFormDatabase((products) => {
      const product = products.find((prods) => prods.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      console.log(updatedProducts);

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteById(id, product.price);
        }
      });
    });
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static getProductById(id, cb) {
    getProductsFormDatabase((product) => cb(product.find((p) => p.id === id)));
  }
};
