//require for mongo
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

//require for Object of mongoose
const Customer = require('./models/customer');
const Product = require('./models/product');
const Cart = require('./models/cart');

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
      Image: "polo-shirt-1.png",
      Name: "Polo-Shirt-Men",
      Category: "Shirt",
      Color: "Dark Blue",
      Cost: "12.3",
      SaleOff: "50",
      Amount: "10",
      Describe: "Made in china",
      Size: "M"
    });
    const product2  = new Product({
      _Id: "2",
      Image: "polo-shirt-2.png",
      Name: "Polo-Shirt-Men",
      Category: "Shirt",
      Color: "Dark Blue",
      Cost: "10.1",
      SaleOff: "30",
      Amount: "10",
      Describe: "Made in VietName",
      Size: "L"
    });
    const product3  = new Product({
      _Id: "3",
      Image: "polo-shirt-3.png",
      Name: "Polo-Shirt-Men",
      Category: "Shirt",
      Color: "Dark Blue",
      Cost: "10.18",
      SaleOff: "10",
      Amount: "15",
      Describe: "Made in Singapo",
      Size: "XL"
    });
    const product4  = new Product({
      _Id: "4",
      Image: "polo-shirt-4.png",
      Name: "Polo-Shirt-Men",
      Category: "Shirt",
      Color: "White",
      Cost: "10.18",
      SaleOff: "10",
      Amount: "15",
      Describe: "Made in Singapo",
      Size: "XL"
    });
    collectionProduct.insert([product1,product2,product3,product4], function(err, res){
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
