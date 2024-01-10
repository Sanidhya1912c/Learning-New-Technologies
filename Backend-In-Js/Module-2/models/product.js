const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    const defaultPicture =
      "https://images.unsplash.com/photo-1591171291116-6310ea27c3f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    this.id = id || Math.random();
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl === "" ? defaultPicture : imageUrl;
  }

  save() {
    return db.execute(
      `INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)`,
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  editProduct() {
    db.execute(`DELETE FROM products WHERE id = ${this.id}`).then(() => {
      this.save();
    })
  }

  static deleteById(id) {
    db.execute(`DELETE FROM products WHERE id = ${id}`)
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

};
