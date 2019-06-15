var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_XGoF9NUEjFTBgEA5y5easUPf00V47Uu8FR');

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

var OrderModel = require('../models/order');

function GetCart(username, callback) {
  MongoClient.connect(uri, { useNewUrlParser: true}, function(err, dbRef) {
    if(err) {
      console.log(err);
      return
    } else {
      let cartCollection = dbRef.db("shoppingdb").collection("Cart");
      cartCollection.findOne({ Username: username}, function(err, cart) {
        console.log(cart + "1")
        dbRef.close()

        callback(cart)
      });
    }
  });
}

function requiresLogin(req, res, next) {
  if (req.user) {
    return next();
  } else {
    var err = new Error('Bạn phải đăng nhập để xem trang này.');
    err.status = 401;
    return next(err);
  }
}

router.get('/order', requiresLogin, function(req,res,next) { //them id cua cart vao
  // let id = req.param.id
  GetCart('Bao', function(cart){
    res.render('order', {
      user: req.user, title: 'Trang thông tin mua hàng',
      cart: cart
    });
  });
});

router.post('/checkout', requiresLogin, function(req,res,next) {
  const token = req.body.stripeToken;
  const sum = 1000;
  stripe.charges.create({
    amount: sum,
    currency: 'usd',
    description: 'Example charge',
    source: token,
  }, (err, charge) => {
    if (err) {
      res.render('aftercheckout', {title: 'Xác nhận đơn hàng', message: err});
    } else {
      MongoClient.connect(uri, { useNewUrlParser: true}, function(err, dbRef) {
        if(err) {
          console.log(err);
          return
        } else {
          
          let orderCollection = dbRef.db("shoppingdb").collection("Order");
          orderCollection.insertOne(, function() {

          });
        }
      });
      res.render('aftercheckout', {title: 'Xác nhận đơn hàng', message: 'Bạn đã mua hàng thành công!'});
    }
  });
});



// const stripe = require('stripe')('sk_test_fEWUlhy9hiuwamixG4EDWF5J00dAp2cRIb')
// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
//
// const app = express()
// const port = process.env.PORT || 3000
//
// app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extented: false
// }))
//
// app.post('/charge', (req, res) => {
//   const {amount, currency, token, description} = req.body
//   console.log(amount, currency, token, description)
//   stripe.charges.create({
//     amount: +amount,
//     currency,
//     source: token,
//     description
//   }, (err, charge) => {
//     if (err) res.json({code: 0})
//     res.json({code: 1})
//   })
// })







module.exports = router
