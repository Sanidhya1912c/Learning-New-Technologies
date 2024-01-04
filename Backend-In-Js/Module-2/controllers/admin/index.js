const Product = require("../../models/product");

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
  const { title, price, description } = req.body;

  const product = new Product(title, price, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("admin/products", {
    pageTitle: "Products",
    path: "/admin/products",
  });
};

exports.getEditProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Edit-Products",
    path: "/admin/edit-product",
  });
};
