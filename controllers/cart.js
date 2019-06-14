var express = require('express');
var router = express.Router();

router.get('/cart', function(req, res, next){
  if(req.isAuthenticated()){
    res.render('cart', {
      title: 'Giỏ hàng',
      isLogin: Boolean(req.user),
      user: req.user
    });
  }
  else{
    res.redirect('/');
  }
});

router.get('/checkout', function(req, res,next){
  if(req.isAuthenticated()){
  res.render('checkout', { title: 'Mua hàng', isLogin: Boolean(req.user), user: req.user });
  }
  else{
    res.redirect('/');
  }
});
module.exports = router;
