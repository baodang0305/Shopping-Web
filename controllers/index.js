var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

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
      let Async_Await = async()=>{
        let list_product_man = await collectionProduct.find({Gender: 'Man', }).limit(8).toArray();
        let list_product_women = await collectionProduct.find({Gender: 'Women'}).limit(8).toArray();
        let list_product_sport = await collectionProduct.find({Category: 'Sport'}).limit(8).toArray();
        let list_product_popular = await collectionProduct.find({Product_Group: 'Popular'}).toArray();
        let list_product_feature = await collectionProduct.find({Product_Group: 'Feature'}).toArray();
        let list_product_new = await collectionProduct.find({Product_Group: 'New'}).toArray();
        if (req.user) {
          res.render('index', { csrfToken: req.csrfToken(), user: req.user, isLogin: true, title: 'Trang Chủ', 'list_product_man': list_product_man, 'list_product_women': list_product_women,
                                                   'list_product_sport': list_product_sport,'list_product_popular': list_product_popular,
                                                   'list_product_feature': list_product_feature, 'list_product_new': list_product_new});
        } else {
          res.render('index', { csrfToken: req.csrfToken(), isLogin: false, title: 'Trang Chủ', 'list_product_man': list_product_man, 'list_product_women': list_product_women,
                                                   'list_product_sport': list_product_sport,'list_product_popular': list_product_popular,
                                                   'list_product_feature': list_product_feature, 'list_product_new': list_product_new});
        }


      }
      Async_Await();
    }
  });
});

module.exports = router;
