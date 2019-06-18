const express = require('express');
const product = require('../../models/product');
const router = express.Router();

const LIMIT = 8;
router.get('/all-product-:id/viewpage=:page', function(req, res, next){
  var id = req.params.id;
  var page = req.params.page;
  console.log(page);
  (async()=>{
    var list_all_product;
    if(id == 'man'){
      list_all_product = await product.find({Gender: 'Man'}).limit(LIMIT).skip(page*LIMIT - LIMIT);
    }
    if(id == 'women'){
      list_all_product = await product.find({Gender: 'Women'}).limit(LIMIT).skip(page*LIMIT - LIMIT);
    }
    if(id == 'all'){
      list_all_product = await product.find({}).limit(LIMIT).skip(page*LIMIT - LIMIT);
    }
    if(id == 'popular'){
      list_all_product = await product.find({Product_Group: 'Popular'}).limit(LIMIT).skip(page*LIMIT - LIMIT);
    }
    if(id == 'feature'){
      list_all_product = await product.find({Product_Group: 'Feature'}).limit(LIMIT).skip(page*LIMIT - LIMIT);
    }
    if(id == 'new'){
      list_all_product = await product.find({Product_Group: 'New'}).limit(LIMIT).skip(page*LIMIT - LIMIT);
    }
    let count = 0
    list_all_product.forEach(element => {
      count += 1;
    });
    console.log(count);
    res.render('all-product', { title: 'All Product Women', isLogin: Boolean(req.user), user: req.user, 'list_all_product': list_all_product, page, id, count});
  })();
});

module.exports = router;
