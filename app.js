const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const mongoose = require('mongoose');
require('./config/passport');

//require for routes
const indexRouter = require('./controllers/index');
const customerRouter = require('./controllers/customer');
const productRouter = require('./controllers/product/all-product');
const productDetailRouter = require('./controllers/product/product-detail');
const cartRouter = require('./controllers/cart');
const orderRouter = require('./controllers/order');
const commentRouter = require('./controllers/comment');
const app = express();

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/shoppingdb";
mongoose.Promise = global.Promise;
mongoose.connect(uri, {useNewUrlParser: true}).then(
  ()=>{console.log('connect is success')},
  err=>{console.log(err);}
);

app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/cart'),
  path.join(__dirname, 'views/customer'),
  path.join(__dirname, 'views/product'),
  path.join(__dirname, 'views/order')
]);

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
app.use(session({secret: 'mysecret', resave: true, saveUninitialized: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/theme-color')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/images/fashion')));
app.use(express.static(path.join(__dirname, 'public/images/flag')));
app.use(express.static(path.join(__dirname, 'public/images/slider')));
app.use(express.static(path.join(__dirname, 'public/images/slider/ajax-loader.gif')));

app.use(express.static(path.join(__dirname, 'public/images/view-slider/larger')));
app.use(express.static(path.join(__dirname, 'public/images/view-slider/medium')));
app.use(express.static(path.join(__dirname, 'public/images/view-slider/thumbnail')));
app.use(express.static(path.join(__dirname, 'public/scss')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/', indexRouter);
app.use('/', productRouter);
app.use('/', productDetailRouter);
app.use('/', cartRouter);
app.use('/', customerRouter);
app.use('/', commentRouter);
app.use('/', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
