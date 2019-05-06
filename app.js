var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//require for routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//require for mongo
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

//require for Object of mongoose
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

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
app.use(express.static(path.join(__dirname, 'public/images/fashion')));
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
app.use(express.static(path.join(__dirname, 'public/scss')));
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

//Connect and Create database to Mongodb Atlas
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully connected");
    const collectionCustomer = client.db("shoppingdb").collection("Customer");

    //add customer
    const customer1 = new Customer({
      UserName: "BaoDang",
      Name: "Đặng Xuân Hoài Bảo",
      Password: "baodang",
      Adress: "Distric 7",
      PhoneNumber: "0123456789",
      Email: "hoaibaodang@gmail.com"
    });
    const customer2 = new Customer({
      UserName: "VanChau",
      Name: "Huỳnh Văn Châu",
      Password: "vanchau",
      Adress: "Distric BinhTan",
      PhoneNumber: "0123456789",
      Email: "vanchau@gmail.com"
    });
    const customer3 = new Customer({
      UserName: "HoangCuong",
      Name: "Lê Nguễn Hoàng Cương",
      Password: "hoangcuong",
      Adress: "Binh Duong",
      PhoneNumber: "0123456789",
      Email: "hoangcuong@gmail.com"
    });
    collectionCustomer.insert([customer1,customer2,customer3], function(err, res){
      console.log("customer is created ")
    });
    
    //add product
    const collectionProduct = client.db("shoppingdb").collection("Product");
    const product1  = new Product({
      _Id: "1",
      Image: "image1.jpg",
      Name: "Tshirt1",
      Category: "Tshirt",
      Color: "Red",
      Cost: "12.3",
      SaleOff: "50",
      Amount: "10",
      Describe: "Made in china",
      Size: "M"
    });
    const product2  = new Product({
      _Id: "2",
      Image: "image2.jpg",
      Name: "Shirt2",
      Category: "Shirt",
      Color: "Green",
      Cost: "10.1",
      SaleOff: "30",
      Amount: "10",
      Describe: "Made in VietName",
      Size: "L"
    });
    const product3  = new Product({
      _Id: "3",
      Image: "image3.jpg",
      Name: "Shirt3",
      Category: "Shirt",
      Color: "Brown",
      Cost: "10.18",
      SaleOff: "10",
      Amount: "15",
      Describe: "Made in Singapo",
      Size: "XL"
    });
    collectionProduct.insert([product1,product2,product3], function(err, res){
      console.log("product is created ")
    });

    //add cart
    const collectionCart = client.db("shoppingdb").collection("Cart");
    const cart  = new Cart({
      UserName: customer1.UserName,
      Id: [{Id: product1.Id}, {Id: product2.Id}]
    });
    
    collectionCart.insertOne(cart, function(err, res){
      console.log("cart is created ")
    });

  }
    
});

module.exports = app;
