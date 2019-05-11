var express = require('express');
var router = express.Router();
module.exports = router;
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var productModel = require('../models/product');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
router.get('/', function(req, res, next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully connected");
      const collectionProduct = client.db("shoppingdb").collection("Product");
      collectionProduct.find().toArray(function(err, lproduct){
        res.render('index', {title: 'Trang Chủ', 'lproduct': lproduct});
        client.close();
      });
    }
  });
});

module.exports = router;
