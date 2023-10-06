const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous product
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; // Initialize totalPrice to 0

      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const numericPrice = parseFloat(productPrice);
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      console.log(existingProductIndex);

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].qty++; // Increment the quantity
      } else {
        cart.products.push({ id: id, qty: 1 });
      }

      cart.totalPrice += numericPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);

      if(!product){
        return;
      }
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err){
        return null;
      }else{
        cb(cart);
      }
    });
  }
};
