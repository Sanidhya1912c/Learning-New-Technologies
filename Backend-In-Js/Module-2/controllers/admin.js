const Product = require("../models/product");

const saveProduct = (res, product, redirectPath) => {
  product.save();
  res.redirect(redirectPath);
};

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
  const product = new Product(productId, title, imageUrl, description, +price);
  saveProduct(res, product, "/");
};

exports.getEditProductId = (req, res, next) => {
  const productId = req.params.productId;
  const editingMode = req.query.edit;

  if (!editingMode || !productId) {
    return res.redirect("/");
  }

  try {
    const product = Product.getProductById(productId);
    if (!product) {
      return res.redirect("/");
    }

    console.log(product);

    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editingMode,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, +price);
  saveProduct(res, product, "/");
};

exports.getProducts = (req, res, next) => {
  try {
    const products = Product.fetchAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
