var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

router.get('/forgot-password', function(req, res, next){
  res.render('forgot-password', { title: 'Quên mật khầu', isLogin: Boolean(req.user), user: req.user });
});

router.get('/account-detail', function(req, res,next){
  res.render('account-detail', {title: 'Tài khoản', isLogin: Boolean(req.user), user: req.user });
});

router.post('/account-detail', function(req, res, next){
  req.checkBody('Username', 'tên tài khoản').notEmpty();
  req.checkBody('Password', 'mật khẩu').isLength({min: 10, max: 20});
  req.checkBody('Name', 'tên người dùng').notEmpty();
  req.checkBody('Address', 'địa chỉ').notEmpty();
  req.checkBody('Phonenumber', 'số điện thoại').notEmpty();
  req.checkBody('Email', 'email').isEmail();
  //console.log(req.user.Username);
  let errors = req.validationErrors();

  if(errors){
    let strErr;
    for(let i=0; i < errors.length; i++){
      if(errors[i].msg != undefined){ 
       strErr = strErr + ", " + errors[i].msg;
      }
    }
    strErr = strErr + " không hợp lệ";
    res.render('account-detail', {title: 'Cập Nhật Tài Khoản', 'mess': strErr});
  }
  else{
    MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client){
      if(err) {console.log(err); return err;}
      const customerCollection = client.db('shoppingdb').collection('Customer');
      customerCollection.findOne({Username: req.body.Username}, function(err, cus){
        if(err) {console.log(err); return err;}
        else if(cus) {
          res.render('account-detail', {title: 'Cập Nhật Tài Khoản', 'mess': 'tài khoản người dùng đã tồn tại'});
        }
        else{
          if(req.body.Password != req.body.Confirm){
            res.render('account-detail', {title: 'Cập Nhật Tài Khoản', 'mess': 'Mật khẩu xác nhận không đúng'});
          }
          else{
            req.body.Password = bcrypt.hashSync(req.body.Password, 10);
            (async()=>{
              await customerCollection.updateOne({ 'Username': req.user.Username},
                                         {$set: {'Username': req.body.Username, 'Password': req.body.Password, 'Name': req.body.Name, 'Address': req.body.Address, 'Phonenumber': req.body.Phonenumber, 'Email': req.body.Email}});
              let user = await customerCollection.findOne({Username: req.body.Username});
              client.close();
              req.logout();
              req.login(user, function(err) {
                if (err) {console.log(err); return next(err); }
                console.log('Thành công');
                return res.render('index', {title: 'Trang Chủ', isLogin: Boolean(req.user), user: req.user});
              });
            })(); 
          }
        }
      })
    })
  }
})

router.get('/signup', function(req, res,next){
  var messages = req.flash('error');
  res.render('sign-up', {title: 'Đăng ký', messages: messages, hasErrors: messages.length > 0});
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
