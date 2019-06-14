const express = require('express');
const product = require('../../models/product');
const router = express.Router();

router.get('/all-product-:id', function(req, res, next){
  var id = req.params.id;
  (async()=>{
    var list_all_product;
    if(id == 'man'){
      list_all_product = await product.find({Gender: 'Man'});
    }
    if(id == 'women'){
      list_all_product = await product.find({Gender: 'Women'});
    }
    if(id == 'all'){
      list_all_product = await product.find({});
    }
    if(id == 'popular'){
      list_all_product = await product.find({Product_Group: 'Popular'});
    }
    if(id == 'feature'){
      list_all_product = await product.find({Product_Group: 'Feature'});
    }
    if(id == 'new'){
      list_all_product = await product.find({Product_Group: 'New'});
    }
    res.render('all-product', { title: 'All Product Women', isLogin: Boolean(req.user), user: req.user, 'list_all_product': list_all_product});
  })();
});

module.exports = router;
