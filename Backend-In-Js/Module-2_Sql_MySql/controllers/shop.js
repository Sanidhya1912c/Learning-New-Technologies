const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  //
  Product.findAll()
    .then((products) => {
      console.log(products)
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductsId = (req, res, next) => { //
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      res.render(`shop/product-detail`, {
        prods: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => { //
  //
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  
  
  // Cart.getCart((cart) => {
  //   Product.fetchAll().then(([rows, fieldData]) => {
  //     const cartPorducts = [];
  //     for (product of rows) {
  //       const cartPorductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartPorductData) {
  //         cartPorducts.push({
  //           productData: product,
  //           quantity: cartPorductData.quantity,
  //         });
  //       }
  //     }
  //     console.log(cartPorducts);
  //     res.render("shop/cart", {
  //       products: cartPorducts,
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.getProductById(productId, (product) => {
    Cart.addProduct(productId, Number(product.price));
  });
  res.redirect("/cart");
};

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  const productPrice = req.body.productPrice;
  Cart.deleteById(productId, productPrice);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
