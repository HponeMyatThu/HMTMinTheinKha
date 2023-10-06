const express = require("express"); //import the express

const adminController = require("../controllers/admin"); //import the product controller
const router = express.Router();
const products = [];


router.get("/edit-product", adminController.getAddProduct);

router.post("/edit-product", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;









