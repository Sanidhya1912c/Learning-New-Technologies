const Product = require("../../models/product");

exports.getProducts = (req, res, next) => {
  res.render("admin/products", {
    pageTitle: "Products",
    path: "/admin/products",
  });
};

exports.getEditProducts = (req, res, next) => {
  res.render("admin/edit-products", {
    pageTitle: "Edit-Products",
    path: "/admin/edit-product",
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
