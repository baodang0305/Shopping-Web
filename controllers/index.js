const express = require('express');
const product = require('../models/product');
const router = express.Router();

router.get('/', function(req, res, next){

  var noMatch = null;
  if(req.query.strSearch){
      const regex = new RegExp(escape(req.query.strSearch), 'gi');
      const Async_Await = async()=>{
      let list_all_product = await product.find({Name: regex});
      if(list_all_product.length < 1){
        noMatch = "Không có sản phẩm";
      }
      res.render('all-product', {title: "Sản Phẩm", 'mess': noMatch, 'list_all_product': list_all_product});
    }
    Async_Await();
  }
  else{
    const Async_Await = async()=>{
      let list_product_man = await product.find({Gender: 'Man', }).limit(8);
      let list_product_women = await product.find({Gender: 'Women'}).limit(8);
      let list_product_sport = await product.find({Category: 'Sport'}).limit(8);
      let list_product_popular = await product.find({Product_Group: 'Popular'});
      let list_product_feature = await product.find({Product_Group: 'Feature'});
      let list_product_new = await product.find({Product_Group: 'New'});

      var messages = req.flash('error');
      res.render('index', { isLogin: Boolean(req.user),
        user: req.user, title: 'Trang Chủ',
        'list_product_man': list_product_man,
        'list_product_women': list_product_women,
        'list_product_sport': list_product_sport,
        'list_product_popular': list_product_popular,
        'list_product_feature': list_product_feature,
        'list_product_new': list_product_new,
        'messages': messages,
        'hasErrors': messages.length > 0
      });
    }
    Async_Await();
  }
});

module.exports = router;
