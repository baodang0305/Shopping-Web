const express = require('express');
const product = require('../../models/product');
const router = express.Router();

const LIMIT = 8;
router.get('/all-product/viewpage=:page', function(req, res, next){
  var id = req.params.id

  var page = req.params.page;
  console.log(page);
  (async()=>{
    var list_all_product;
    if (req.query.all != null) {
      list_all_product = await product.find({}).limit(LIMIT).skip(page*LIMIT - LIMIT);
      searchObjectString = "?all=all";
    } else {
      var searchObject = new Object()
      if (req.query.Gender != null && req.query.Gender != "undefined") {
        searchObject.Gender = req.query.Gender
      }
      if (req.query.Price != 0 && req.query.Price != "undefined") {
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
      if (req.query.Category != 0 && req.query.Category != "undefined") {
        searchObject.Category = req.query.Category
      }
      if (req.query.Product_Group != 0 && req.query.Product_Group != "undefined") {
        searchObject.Product_Group = req.query.Product_Group
      }
      list_all_product = await product.find(searchObject).limit(LIMIT).skip(page*LIMIT - LIMIT);
      searchObjectString = "?Gender=" + String(searchObject.Gender) + "&Price=" + String(searchObject.Price) + "&Category=" + String(searchObject.Category) + "&Product_Group=" + String(searchObject.ProductGroup)
    }
    let count = 0
    list_all_product.forEach(element => {
      count += 1;
    });
    console.log("count" + count)
    console.log(searchObjectString)
    res.render('all-product', { title: 'Danh sách sản phẩm', isLogin: Boolean(req.user), user: req.user, 'list_all_product': list_all_product, page, searchObjectString, count});
  })();
});

module.exports = router;
