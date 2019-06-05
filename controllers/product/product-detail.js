var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
router.get('/product-detail-:id', function(req, res, next){
  var id = req.params.id;
  var object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = client.db("shoppingdb").collection("Product");
      let Async_Await = async()=>{
        let product_detail = await collectionProduct.findOne({_id: object_id});
        let all_product_related = await collectionProduct.find({Category: product_detail.Category, Gender: product_detail.Gender}).toArray();
        client.close();
        res.render('product-detail', {title: 'Product Detail', 'product_detail': product_detail, 'all_product_related': all_product_related});
      }
      Async_Await();
    }
  });
});

module.exports = router;
