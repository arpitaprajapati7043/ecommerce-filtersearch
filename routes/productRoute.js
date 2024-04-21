const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const mainProductCntrl=require('../controller/mainProductCntrl')

router.get('/', productController.getAllProducts);
router.get('/testing', productController.getAllProductTesting);
router.post('/create',mainProductCntrl.create);

module.exports = router;
