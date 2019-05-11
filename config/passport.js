var passport = require('passport');
var Customer = require('../models/customer')
var LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  Customer.findById(id, function(err, user) {
    done(err, user);
  });
});
