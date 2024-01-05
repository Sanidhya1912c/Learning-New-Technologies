const fs = require("fs");
const Path = require("path");

const path = Path.join(
  Path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(path, (err, fileContent) => {
      let cart = {
        products: [
          // {
          //   products: [{ id: "4fyw29mwlr0t1gic", quantity: 1 }],
          //   totalPrice: "022",
          // },
        ],
        totalPrice: 0,

        //puted some real data to understand this code leter 
      };

      if (!err) cart = JSON.parse(fileContent);

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        //use to update the values of cart products

        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(path, JSON.stringify(cart), (err) => console.log(err));
    });
  }
};
