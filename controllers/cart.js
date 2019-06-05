var express = require('express');
var router = express.Router();

router.get('/cart', function(req, res, next){
  res.render('cart', { title: 'Giỏ hàng', isLogin: Boolean(req.user), user: req.user });
});

router.get('/checkout', function(req, res,next){
  res.render('checkout', { title: 'Mua hàng', isLogin: Boolean(req.user), user: req.user });
});
module.exports = router;
