var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/theme-color')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/images/flag')));
app.use(express.static(path.join(__dirname, 'public/images/slider')));
app.use(express.static(path.join(__dirname, 'public/images/slider/ajax-loader.gif')));
app.use(express.static(path.join(__dirname, 'public/images/man')));
app.use(express.static(path.join(__dirname, 'public/images/women')));
app.use(express.static(path.join(__dirname, 'public/images/sports')));
app.use(express.static(path.join(__dirname, 'public/images/electronics')));
app.use(express.static(path.join(__dirname, 'public/images/view-slider/larger')));
app.use(express.static(path.join(__dirname, 'public/images/view-slider/medium')));
app.use(express.static(path.join(__dirname, 'public/images/view-slider/thumbnail')));

app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
