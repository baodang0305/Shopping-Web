var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var productModel = require('../../models/product');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
router.get('/all-product-:id', function(req, res, next){
  var id = req.params.id;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      //console.log("Successfully connected");
      const collectionProduct = client.db("shoppingdb").collection("Product");
      let Async_Await = async()=>{
        var list_all_product;
        if(id == 'man'){
          list_all_product = await collectionProduct.find({Gender: 'Man'}).toArray();
        }
        if(id == 'women'){
          list_all_product = await collectionProduct.find({Gender: 'Women'}).toArray();
        }
        if(id == 'all'){
          list_all_product = await collectionProduct.find({}).toArray();
        }
        if(id == 'popular'){
          list_all_product = await collectionProduct.find({Product_Group: 'Popular'}).toArray();
        }
        if(id == 'feature'){
          list_all_product = await collectionProduct.find({Product_Group: 'Feature'}).toArray();
        }
        if(id == 'new'){
          list_all_product = await collectionProduct.find({Product_Group: 'New'}).toArray();
        }
        res.render('all-product', {title: 'All Product Women', 'list_all_product': list_all_product});
      }
      Async_Await();
    }
  });
});

module.exports = router;
