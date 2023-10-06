const path = require("path"); //import the path

const express = require("express"); // import the express
const adminData = require("./admin"); 
const rootDir = require("../utils/path");
const router = express.Router(); 
const shopController = require("../controllers/shop"); //import the product controller

router.get("/shop", shopController.getIndex); 

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.get("/products/:productId", shopController.getDetailProduct);

router.get("/order", shopController.getOrder);

router.post("/cart-delete-items", shopController.postCartDelete);

router.get("/checkout" , shopController.getCheckOut);

module.exports = router;
