var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/product-detail-:id', function(req, res, next){
  var id = req.params.id;
  var object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = dbRef.db("shoppingdb").collection("Product");
      (async()=>{
        let product_detail = await collectionProduct.find({_id: object_id}).toArray();
        let all_product = await collectionProduct.find({}).toArray();

        dbRef.close();

        res.render('product-detail', {title: 'Product Detail', isLogin: Boolean(req.user), user: req.user, 'product_detail': product_detail, 'all_product': all_product});
      })();
    }
  });
});

module.exports = router;
