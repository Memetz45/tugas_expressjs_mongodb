const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController = require ('./controller');

router.get('/product', productController.index);
router.post('/product', upload.single('image'), productController.store);
router.post('/product/brand', upload.none(), productController.brand);
router.put('/product/:id', upload.single('image'), productController.update);
router.delete('/product/:id', productController.deleteProduct);


module.exports = router;