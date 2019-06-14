const express = require('express');
const cart = require('../models/cart');
const product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();

router.get('/cart', function(req, res, next){
  let Async_Await = async()=>{
    let total = 0;
    let arrProduct=[];
    await cart.findOne({Username: req.user.Username}, function(err, data){
        let tempArr = data.Product;
        tempArr.forEach(item => {
          total = total + item.Total;
            arrProduct.push(item);
        });
    });
    res.render('cart', { title: 'Giỏ hàng', isLogin: Boolean(req.user), user: req.user, 'list_product': arrProduct, 'total': total});
  }
  Async_Await();
});

router.get('/checkout', function(req, res,next){
  res.render('checkout', { title: 'Mua hàng', isLogin: Boolean(req.user), user: req.user });
});

router.post('/addcart-:id', function(req, res, next){
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
          res.redirect('/cart');
      }
      Async_Await();
  }
  else{    
          res.redirect('/product-detail-'+id);
  }
});

module.exports = router;





