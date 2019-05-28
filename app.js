var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

require('./config/passport');

//require for routes
var indexRouter = require('./controllers/index');
var customerRouter = require('./controllers/customer');
var productRouter = require('./controllers/product/all-product');
var productDetailRouter = require('./controllers/product/product-detail');
var cartRouter = require('./controllers/cart');
var app = express();

app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/cart'), path.join(__dirname, 'views/customer'), path.join(__dirname, 'views/product')]);
app.set('view engine', 'hbs');

// require('./config/passport');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'mysecret', resave: false, saveUninitialized: false}));
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

app.use(express.static(path.join(__dirname, 'public/images/man/shirt')));
app.use(express.static(path.join(__dirname, 'public/images/man/tshirt')));

app.use(express.static(path.join(__dirname, 'public/images/women/tshirt')));
app.use(express.static(path.join(__dirname, 'public/images/women/shirt')));

app.use(express.static(path.join(__dirname, 'public/images/sport')));

app.use(express.static(path.join(__dirname, 'public/images/view-slider/larger')));
app.use(express.static(path.join(__dirname, 'public/images/view-slider/medium')));
app.use(express.static(path.join(__dirname, 'public/images/view-slider/thumbnail')));
app.use(express.static(path.join(__dirname, 'public/scss')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/', indexRouter);
app.use('/', customerRouter);
app.use('/', productRouter);
app.use('/', productDetailRouter);
app.use('/', cartRouter);

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
