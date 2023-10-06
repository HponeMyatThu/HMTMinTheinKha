const Product = require("../models/product"); //import the product model
const Cart = require("../models/cart");
const products = []; //initalize the product array

//get method of get all products
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Product",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

// exports.getDetailProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   console.log(prodId);
//   Product.findById(prodId)
//     .then((product, _) => {
//       console.log(product);
//         res.render("shop/product-detail", {
//         product: product,
//         pageTitle: "Product-Detail",
//         path: "/detail",
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.getDetailProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId)
    .then(([product, fieldData]) => {
      if (product === 0) {
        return;
      }
      res.render("shop/product-detail", {
        pageTitle: "detail page",
        path: "/detail",
        product: product[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "shop",
      path: "/",
    });
  });
};

exports.getCheckOut = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getOrder = (req, res, next) => {
  res.render("shop/order", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

// exports.getCart = (req, res, next) => {
//   res.render("shop/cart", {
//     path: "/cart",
//     pageTitle: "Your Cart",
//   });
// };
