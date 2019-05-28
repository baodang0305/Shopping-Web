var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var productModel = require('../../models/product');
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
        let product_detail = await collectionProduct.find({_id: object_id}).toArray();
        let all_product = await collectionProduct.find({}).toArray();
        res.render('product-detail', {title: 'Product Detail', 'product_detail': product_detail, 'all_product': all_product});
      }
      Async_Await();
    }
  });
});

module.exports = router;
