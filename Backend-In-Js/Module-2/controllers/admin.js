const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    product: "",
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: false,
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const product = new Product(productId, title, +price, description, imageUrl);
  product
    .save()
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

exports.getEditProductId = (req, res, next) => {
  const productId = req.params.productId;
  const editingMode = req.query.edit;

  if (!editingMode || !productId) return res.redirect("/");

  Product.getProductById(productId, (product) => {
    if (!product) return res.redirect("/");

    console.log(product);

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
  const product = new Product(null, title, +price, description, imageUrl);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const productId = req.body.productId;
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      productId: productId,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
