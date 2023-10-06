const Product = require("../models/product"); //import the product model

//get method add-product
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "edit Product",
    path: "/admin/edit-product",
    editing: false,
  });
};

//post method of add-product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const product = new Product(null, title, description, imageUrl, price);
  product
    .save()
    .then(() => res.redirect("/products"))
    .catch((err) => console.log(err));
  //products.push({ title: req.body.title });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/add-product");
  }
  const prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
    console.log(product);
    if (!product) {
      res.redirect("/add-product");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updateImageUrl = req.body.imageUrl;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updateImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
  console.log(prodId);
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
