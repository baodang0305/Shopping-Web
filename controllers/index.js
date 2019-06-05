var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/', function(req, res, next){
  var messages = req.flash('error');
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = dbRef.db("shoppingdb").collection("Product");
      (async()=>{

        let list_product_man = await collectionProduct.find({Gender: 'Man', }).limit(8).toArray();
        let list_product_women = await collectionProduct.find({Gender: 'Women'}).limit(8).toArray();
        let list_product_sport = await collectionProduct.find({Category: 'Sport'}).limit(8).toArray();
        let list_product_popular = await collectionProduct.find({Product_Group: 'Popular'}).toArray();
        let list_product_feature = await collectionProduct.find({Product_Group: 'Feature'}).toArray();
        let list_product_new = await collectionProduct.find({Product_Group: 'New'}).toArray();

        dbRef.close()

        if (req.user) {
          res.render('index', { csrfToken: req.csrfToken(), user: req.user, isLogin: true, title: 'Trang Chủ', 'list_product_man': list_product_man, 'list_product_women': list_product_women,
                                                   'list_product_sport': list_product_sport,'list_product_popular': list_product_popular,
                                                   'list_product_feature': list_product_feature, 'list_product_new': list_product_new});
        } else {
          res.render('index', { csrfToken: req.csrfToken(), messages: messages, isLogin: false, title: 'Trang Chủ', 'list_product_man': list_product_man, 'list_product_women': list_product_women,
                                                   'list_product_sport': list_product_sport,'list_product_popular': list_product_popular,
                                                   'list_product_feature': list_product_feature, 'list_product_new': list_product_new});
        }
      })();
    }
  });
});

module.exports = router;
