var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_XGoF9NUEjFTBgEA5y5easUPf00V47Uu8FR');

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

var OrderModel = require('../models/order');
var CartModel = require('../models/cart');

function requiresLogin(req, res, next) {
  if (req.user) {
    return next();
  } else {
    var err = new Error('Bạn phải đăng nhập để xem trang này.');
    err.status = 401;
    return next(err);
  }
};

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

router.get('/order', requiresLogin, function(req,res,next) {
  res.render('order', {
    user: req.user, title: 'Trang thông tin mua hàng'
  });
});

router.post('/checkout', requiresLogin, function(req,res,next) {
  GetCart(req.user.Username, function(cart){
    var sum = 0;
    let product_lite_list = [];
    const token = req.body.stripeToken;
    let product_list = cart.Product;


    for (let i = 0; i < product_list.length; i++) {
      sum = sum + Number(product_list[i].Total)
      product_lite_list.push({
        id: product_list[i]._id,
        name: product_list[i].Name,
        cost: product_list[i].Cost,
        amount: product_list[i].Amount
      });
    }

    let sumInCent = sum * 100
    stripe.charges.create({
      amount: sumInCent,
      currency: 'usd',
      description: 'order cua ' + req.user.Username,
      source: token,
    }, (err, charge) => {
      if (err) {
        res.render('aftercheckout', {title: 'Xác nhận đơn hàng', message: err});
      } else {
        const newOrder = new OrderModel({
          Username: req.user.Username,
          Sum: sum,
          Products: product_lite_list,
          ReceiverPhonenumber: req.body.Phonenumber,
          ReceiverAddress: req.body.Address,
          ReceiverName: req.body.Name
        });
        OrderModel.create(newOrder, function(err, order){
          if (err) {
            console.log(err)
          } else {
            CartModel.find({Username: req.user.Username}).remove().exec()
            res.render('aftercheckout', {title: 'Xác nhận đơn hàng', message: 'Bạn đã mua hàng thành công!'});
          }
        });
      }
    });
  });
});




module.exports = router
