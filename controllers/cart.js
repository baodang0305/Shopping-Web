var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/cart', function(req, res,next){
  res.render('cart', { title: 'Giỏ hàng' });
});

router.get('/checkout', function(req, res,next){
  res.render('checkout', { title: 'Mua hàng' });
});
module.exports = router;
