const express = require('express');
const product = require('../../models/product');
const router = express.Router();

router.get('/all-product', function(req, res, next){
  (async()=>{
    var list_all_product;
    console.log(req.query)
    if (req.query.all == null) {
      list_all_product = await product.find(req.query);
      console.log(list_all_product)
    } else {
      list_all_product = await product.find({});
    }

    res.render('all-product', { title: 'Danh sách sản phẩm', isLogin: Boolean(req.user), user: req.user, 'list_all_product': list_all_product});
  })();
});

module.exports = router;
