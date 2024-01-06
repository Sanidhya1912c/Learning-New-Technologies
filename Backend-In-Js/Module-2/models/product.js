const fs = require("fs").promises;
const path = require("path");
const uniqueId = require("uniqid");

const dataFilePath = path.join(__dirname, "data", "products.json");


const getDefaultPicture = () =>
  "https://images.unsplash.com/photo-1591171291116-6310ea27c3f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl || getDefaultPicture();
    this.description = description;
    this.price = price;
  }

  async save() {
    const products = await this.constructor.fetchAll();
    if (this.id) {
      const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;
      await fs.writeFile(dataFilePath, JSON.stringify(updatedProducts));
    } else {
      this.id = uniqueId();
      products.push(this);
      await fs.writeFile(dataFilePath, JSON.stringify(products));
    }
  }

  static async fetchAll() {
    try {
      const fileContent = await fs.readFile(dataFilePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  static async getProductById(id) {
    const products = await this.fetchAll();
    return products.find((product) => product.id === id);
  }
};
