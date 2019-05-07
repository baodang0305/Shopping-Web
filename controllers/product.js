var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/product-detail', function(req, res,next){
  res.render('product-detail', { title: 'Chi tiết sản phẩm' });
});
router.get('/all-product', function(req, res,next){
  res.render('all-product', { title: 'Tất cả sản phầm' });
});
module.exports = router;

