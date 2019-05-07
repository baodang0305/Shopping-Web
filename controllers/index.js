var express = require('express');
var router = express.Router();
module.exports = router;

const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var productModel = require('../models/product');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/', function(req, res,next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully connected");
      const collectionProduct = client.db("shoppingdb").collection("Product");
      var arrayList = [];
      var done = 0;
      var cursor = collectionProduct.find({})
      cursor.forEach(function(productModel) {
        arrayList.push(productModel);
        done++;
        if (done === 4) {
          res.render('index', {title: 'Trang Chủ', listProduct: arrayList});
        }
      });
    }
  });
});

module.exports = router;
