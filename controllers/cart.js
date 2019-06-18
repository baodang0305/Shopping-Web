const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();

const cart = require('../models/cart');
const product = require('../models/product');

function requiresLogin(req, res, next) {
  if (req.user) {
    return next();
  } else {
    var err = new Error('Bạn phải đăng nhập để xem trang này.');
    err.status = 401;
    return next(err);
  }
};

router.get('/cart', requiresLogin, function(req, res, next){
  let Async_Await = async()=>{
    let total = 0;
    let arrProduct=[];
    await cart.findOne({Username: req.user.Username}, function(err, data){
      if(err){
        console.log(err);
      }
      else if(data){
        let tempArr = data.Product;
        tempArr.forEach(item => {
          total = total + item.Total;
            arrProduct.push(item);
        });
      }
    });
    res.render('cart', { title: 'Giỏ hàng', isLogin: Boolean(req.user), user: req.user, 'list_product': arrProduct, 'total': total});
  }
  Async_Await();
});

router.post('/addcart-:id', requiresLogin, function(req, res, next){
  let id = req.params.id;
  if(req.isAuthenticated()){
      let amount = req.body.Amount;
      if(amount == null){
        amount = 1;
      }
      let object_id = new ObjectId(id);
      let Async_Await = async()=>{
          let tempProduct = await product.findOne({'_id': object_id});
          let total = tempProduct.Cost * amount;
          let tempCustomerInCart = await cart.findOne({Username: req.user.Username});
          if(tempCustomerInCart){
              const pro = {
                  'Id': tempProduct._id,
                  'Image': tempProduct.Image,
                  'Name': tempProduct.Name,
                  'Cost': tempProduct.Cost,
                  'Amount': amount,
                  'Total': total
              }
              cart.findOneAndUpdate({Username: req.user.Username},
                                   {$push: {Product: pro}},
                                   {safe: true, upsert: true},
                  function(err) {
                      if(err){
                      console.log(err);
                      }else{
                          console.log('add product into cart is success');
                      }
                  }
              );
          }
          else{
              const tempCart = new cart({
                  Username: req.user.Username,
                  Product: [
                              {
                                'Id': tempProduct._id,
                                'Image': tempProduct.Image,
                                'Name': tempProduct.Name,
                                'Cost': tempProduct.Cost,
                                'Amount': amount,
                                'Total': total
                              }
                           ]
              });
              cart.create(tempCart, function(err){
                  if(err) return console.log(err);
                  else{ console.log('cart is created');}
              });
          }
          res.redirect('/');
      }
      Async_Await();
  }
  else{
          res.redirect('/product-detail-'+id);
  }
});

router.post('/product-cart-delete-:id', function(req, res){
  let id = req.params.id;
  let object_id = new ObjectId(id);
  cart.update({Username: req.user.Username}, 
    {$pull: {'Product': {_id: object_id}}},  
    function(err) {
    if(err){
      console.log(err);
    }else{
      console.log('delete product in cart is success');
    }
  })
  res.redirect('/cart');
});

module.exports = router;
