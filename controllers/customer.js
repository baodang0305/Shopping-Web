var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection)

router.get('/forgotPassword', function(req, res, next){
  res.render('forgot-password', { title: 'Quên mật khầu', isLogin: Boolean(req.user), user: req.user });
});

router.get('/account-detail', function(req, res,next){
  res.render('account-detail', {title: 'Tài khoản', isLogin: Boolean(req.user), user: req.user });
});

router.get('/signup', function(req, res,next){
  var messages = req.flash('error');
  res.render('sign-up', {title: 'Đăng ký', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/account-detail',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
