var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt");
const MongoClient = require("mongodb").MongoClient;

const saltRounds = 10;
var CustomerModel = require('../models/customer');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

passport.serializeUser(function(customer, done) {
  done(null, customer.Username)
});

passport.deserializeUser(function(username, done) {
  MongoClient.connect(uri, { useNewUrlParser: true}, function(err, dbRef){
    if (err) {
      return done(null, false, {message: "Không thể kết nối"})
    } else {
      let collectionCustomer = dbRef.db("shoppingdb").collection("Customer");
      collectionCustomer.findOne({Username: username}, function(err, client){

        dbRef.close();

        if (err) {
          done(null, false, {message: "Không thể kết nối"})
        }
        if (!client) {
          done(null, false, {message: "Không thể tìm thấy người dùng"})
        }
        done(null, client)
      });
    }
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'UserName',
  passwordField: 'Password',
  passReqToCallback: true
}, function(req, username, password, done) {

    // validate with express validator
    req.checkBody('UserName', 'Tên đăng nhập chưa hợp lệ').notEmpty();
    req.checkBody('Password', 'Mật khẩu chưa hợp lệ').notEmpty().isLength({min: 10, max: 20});
    var errors = req.validationErrors();
    if (errors) {
      var messages = [];
      errors.forEach(function(error){
          messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }

    MongoClient.connect(uri, { useNewUrlParser: true}, function(err , dbRef) {
      if (err) {
        return done(null, false, {message: "Không thể kết nối"});
      } else {
        let collectionCustomer = dbRef.db("shoppingdb").collection("Customer");
        collectionCustomer.findOne({Username: username}, function(err, client) {

          dbRef.close();

          if (err) {
            return done(null, false, {message: "Không thể kết nối"});
          }
          if (client) {
           return done(null, false, {message: "Tên này đã có người sử dụng"});
          }
          let newCustomer = new CustomerModel();
          let name = req.body.Name;
          let address = req.body.Address;
          let phone = Number(req.body.PhoneNumber) || 0;
          let email = req.body.Email;
          newCustomer.signup(username, password);
          newCustomer.addInfo(name, address, phone, email);
          collectionCustomer.insert(newCustomer, function(err, client) {
            if (err) {
              return done(null, false, {message: "Không thể kết nối"});
            }
            return done(null, newCustomer);
          });
        })
      }
    })
  }));

  passport.use('local.signin', new LocalStrategy({
    usernameField: 'UserName',
    passwordField: 'Password'
  }, function(username, password, done) {
      MongoClient.connect(uri, { useNewUrlParser: true}, function(err , dbRef) {
        if (err) {
          return done(null, false, {message: "Không thể kết nối"});
        } else {
          let collectionCustomer = dbRef.db("shoppingdb").collection("Customer");
          collectionCustomer.findOne({Username: username}, function(err, client) {

            dbRef.close();

            if (err) {
              return done(null, false, {message: "Không thể kết nối"});
            }
            if (!client) {
             return done(null, false, {message: "Không tìm thấy người dùng"});
            }
            let customerModel = new CustomerModel(client);
            customerModel.Username = client.Username;
            customerModel.Password = client.Password;
            if (!customerModel.login(username, password)) {
              return done(null, false, {message: "Mật khẩu sai"});
            }
            return done(null, customerModel);
          })
        }
      })
    }));
