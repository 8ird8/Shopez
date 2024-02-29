const {Router} = require('express');
const multer = require('multer');

const upload = require('../middlewares/multer');
const router = Router();
const {AddProduct, FetchingProducts, ProductDetails, DeleteProduct, Mylistings, deleteImages, updateProduct, AddCart,Cart} = require('../controllers/productController');


router.post('/List',upload.array('product_Images', 8), AddProduct);
router.get('/products', FetchingProducts);
router.get('/product/:productId', ProductDetails);
router.delete('/delete/:productId', DeleteProduct);
router.get('/mylistings/:userId', Mylistings);
router.delete('/product/:productId/image/:imageName',deleteImages)
router.put('/updateProduct/:productId',upload.array('product_Images', 8),updateProduct)
router.post('/product/:productId/cart', AddCart)
router.get('/mycart/:userId', Cart);




module.exports = router;