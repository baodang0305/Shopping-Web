var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('connection accepted');
  client.close();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/all-product', function(req, res,next){
  res.render('all-product', { title: 'Express' });
});

router.get('/product-detail', function(req, res,next){
  res.render('product-detail', { title: 'Express' });
});

router.get('/cart', function(req, res,next){
  res.render('cart', { title: 'Express' });
});

router.get('/checkout', function(req, res,next){
  res.render('checkout', { title: 'Express' });
});


router.get('/login', function(req, res,next){
  res.render('login', { title: 'Express' });
});

router.get('/forgotPassword', function(req, res,next){
  res.render('Repass', { title: 'Express' });
});

router.get('/account', function(req, res,next){
  res.render('account', { title: 'Express' });
});

router.get('/wishlist', function (req, res, next) {
    res.render('wishlist', { title: 'Express' });
});
module.exports = router;
