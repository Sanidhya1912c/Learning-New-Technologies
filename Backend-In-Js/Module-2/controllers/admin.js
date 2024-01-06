const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: false,
  });
};

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  console.log(title, imageUrl, price, description);
  res.redirect('/')
};

exports.getEditProductId = (req, res, next) => {
  const productId = req.params.productId;
  const editingMode = req.query.edit;

  if (!editingMode || !productId) return res.redirect("/");

  Product.getProductById(productId, (product) => {
    if (!product) return res.redirect("/");

    console.log(product)

    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit Product",
      path: "/admin/edits-product",
      editing: editingMode,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, +price);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
