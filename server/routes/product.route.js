const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get("/getallproductapi", productController.getAllProducts);
router.get("/getallproductsmainstorefilters/:filter", productController.getAllProductsMainStore);
router.get("/getproductitemdetails/:id", productController.getProductItemDetails);
router.get("/getallproductsapifilters/:filter", productController.getAllProductsFilters);
router.get("/getcartallitems/:userId", productController.getCartItems);
router.get("/gettrackallitems/:userId", productController.trackAllItems);
router.get("/getallproductapicategory/:ParentCategory/:Category/:Brand", productController.getProductDetails);

module.exports = router;
