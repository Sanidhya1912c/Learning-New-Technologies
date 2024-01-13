//Get Requests

exports.getIndex = (req, res, next) => {
  res.render("shop/", {
    prods: "",
    pageTitle: "Home",
    path: "/",
  });
};

exports.getProducts = (req, res, next) => {
  res.render("shop/product-list", {
    prods: "",
    pageTitle: "Products",
    path: "/products",
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    prods: "",
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    prods: "",
    pageTitle: "Orders",
    path: "/orders",
  });
};
