var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/', function(req, res, next){
  var messages = req.flash('error');

  var noMatch = null;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully connected");
      const collectionProduct = dbRef.db("shoppingdb").collection("Product");
      if(req.query.strSearch){
        console.log(req.query.strSearch);
        const regex = new RegExp(escape(req.query.strSearch), 'gi');
        console.log(regex);
          let Async_Await = async()=>{
          let list_all_product = await collectionProduct.find({Name: regex}).toArray();

          dbRef.close();

          console.log(list_all_product);
          if(list_all_product.length < 1){
            noMatch = "No results you want to find";

          }
          res.render('all-product', {title: "Sản Phẩm", 'mess': noMatch, 'list_all_product': list_all_product});
        }
      }
      else{
        let Async_Await = async()=>{
          let list_product_man = await collectionProduct.find({Gender: 'Man', }).limit(8).toArray();
          let list_product_women = await collectionProduct.find({Gender: 'Women'}).limit(8).toArray();
          let list_product_sport = await collectionProduct.find({Category: 'Sport'}).limit(8).toArray();
          let list_product_popular = await collectionProduct.find({Product_Group: 'Popular'}).toArray();
          let list_product_feature = await collectionProduct.find({Product_Group: 'Feature'}).toArray();
          let list_product_new = await collectionProduct.find({Product_Group: 'New'}).toArray();

          dbRef.close();

          res.render('index', {title: 'Trang Chủ', 'list_product_man': list_product_man, 'list_product_women': list_product_women,
                                                   'list_product_sport': list_product_sport,'list_product_popular': list_product_popular,
                                                   'list_product_feature': list_product_feature, 'list_product_new': list_product_new});
        }
      }

      Async_Await();

    }
  });
});

module.exports = router;
