const express = require('express');
const product = require('../../models/product');
const router = express.Router();

router.get('/all-product', function(req, res, next){
  (async()=>{
    var list_all_product;
    if (req.query.all != null) {
      list_all_product = await product.find({});
    } else {
      var searchObject = new Object()
      if (req.query.Gender != null) {
        searchObject.Gender = req.query.Gender
      }
      if (req.query.Price != 0) {
        let priceTag = req.query.Price
        switch (priceTag) {
          case 1:
          searchObject.Cost = {
            $lte: 10
          }
          break;
          case 2:
            searchObject.Cost = {
              $gte: 10,
              $lte: 30
            }
          break;
          case 3:
            searchObject.Cost = {
              $gte: 30,
              $lte: 60
            }
          break;
          case 4:
            searchObject.Cost = {
              $gte: 60
            }
          break;
        }
      }
      if (req.query.Category != 0) {
        searchObject.Category = req.query.Category
      }
      if (req.query.Product_Group != 0) {
        searchObject.Product_Group = req.query.Product_Group
      }
      list_all_product = await product.find(searchObject);
    }
    res.render('all-product', { title: 'Danh sách sản phẩm', isLogin: Boolean(req.user), user: req.user, 'list_all_product': list_all_product});
  })();
});

module.exports = router;
