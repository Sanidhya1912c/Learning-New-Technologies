const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => { //
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
  product.editProduct();
  res.redirect("/");
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

  Product.fetchAll().then(([rows, fieldData]) => {
    const [product] = rows.filter((item) => item.id === +productId);
    if (!product) return res.redirect("/");

    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit Product",
      path: "/admin/edits-product",
      editing: editingMode,
    });
  });
};

exports.postAddProduct = (req, res, next) => { //
  const { title, imageUrl, price, description } = req.body;
  const defaultPicture =
    "https://images.unsplash.com/photo-1591171291116-6310ea27c3f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const finalImgUrl = imageUrl || defaultPicture;
  Product.create({ title, price, description, imageUrl: finalImgUrl })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  res.redirect('/')
};

exports.getProducts = (req, res, next) => {
  const productId = req.body.productId;
  Product.fetchAll()
    .then(([rows, fieldDarta]) => {
      res.render("admin/products", {
        prods: rows,
        productId: productId,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
