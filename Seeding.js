//require for mongo
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

//require for Object of mongoose
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

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
    const cart1  = new Cart({
      UserName: customer1.UserName,
      ProductId: product1._Id
    });
    const cart2 = new Cart({
      UserName: customer1.UserName,
      ProductId: product2._Id
    });
    const cart3 = new Cart({
      UserName: customer2.UserName,
      ProductId: product3._Id
    });

    console.log(cart3.UserName)

    collectionCart.insert([cart1, cart2, cart3], function(err, res){
      console.log("cart is created ")
    });
  }

});
