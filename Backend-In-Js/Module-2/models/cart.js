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
        // if product exist
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        // use to update the values of cart products

        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // if product does not exist
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(path, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static getCart(cb) {
    fs.readFile(path, (err, fileContent) => {
      if (err) numm;
      const cart = JSON.parse(fileContent);
      return cb(cart);
    });
  }

  static deleteById(id, productPrice) {
    fs.readFile(path, (err, fileContent) => {
      if (err) return;
      const cart = JSON.parse(fileContent);
      const updaterCart = { ...cart };
      const product = updaterCart.products.find((prods) => prods.id === id);

      if (!product) return;
      
      if (product.quantity > 1) {
        product.quantity = product.quantity - 1;

        updaterCart.products = updaterCart.products.filter(
          (prods) => prods.id !== id
        );

        updaterCart.products.push(product);

        updaterCart.totalPrice = updaterCart.totalPrice - productPrice;

        fs.writeFile(path, JSON.stringify(updaterCart), (err) =>
          console.log(err)
        );
      } else {
        updaterCart.products = updaterCart.products.filter(
          (prods) => prods.id !== id
        );
        updaterCart.totalPrice = updaterCart.totalPrice - productPrice;

        fs.writeFile(path, JSON.stringify(updaterCart), (err) =>
          console.log(err)
        );
      }
    });
  }
};
