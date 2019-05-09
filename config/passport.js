var passport = require('passport');
var Customer = require('../models/Customer')
var LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function(customer, done) {
  done(null, customer.id)
});

passport.deserializeUser(function(id, done) {
  Customer.findById(id, function(err, customer) {
    done(err, customer);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'UserName',
  passwordField: 'Password',
  passReqToCallback: true
}, function(req, username, password, done) {
  Client.findOne({'UserName': username}, function(err, customer) {
    if(err) {
      return done(err);
    }
    if(customer) {
      return done(null, false, {message: 'Tên đăng nhập đã được sử dụng'})
    }
    var newClient = new Client()
    newClient.UserName = username
    newClient.Password = newClient.encryptPassword(passport)
    newClient.save(function(err, result){
      if (err) {
        return done(err)
      }
      return done(null, newClient);
    }
  }
})
