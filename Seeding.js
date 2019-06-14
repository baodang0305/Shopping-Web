//require for mongo
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var bcrypt =  require('bcrypt');
//require for Object of mongoose
const Customer = require('./models/customer');
const Product = require('./models/product');
const Cart = require('./models/cart');

//Connect and Create database to Mongodb Atlas
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully connected");
    // const collectionCustomer = client.db("shoppingdb").collection("Customer");

    // //add customer
    // const customer1 = new Customer({
    //   Username: "BaoDang",
    //   Name: "Đặng Xuân Hoài Bảo",
    //   Password: "baodang",
    //   Address: "Distric 7",
    //   PhoneNumber: "0123456789",
    //   Email: "hoaibaodang@gmail.com"
    // });
    // const customer2 = new Customer({
    //   Username: "VanChau",
    //   Name: "Huỳnh Văn Châu",
    //   Password: "vanchau",
    //   Address: "Distric BinhTan",
    //   PhoneNumber: "0123456789",
    //   Email: "vanchau@gmail.com"
    // });
    // const customer3 = new Customer({
    //   Username: "HoangCuong",
    //   Name: "Lê Nguễn Hoàng Cương",
    //   //Password: "hoangcuong",
    //   Password: bcrypt.hashSync("hoangcuong", 10),
    //   Address: "Binh Duong",
    //   PhoneNumber: "0123456789",
    //   Email: "hoangcuong@gmail.com"
    // });
    // collectionCustomer.insert([customer1,customer2,customer3], function(err, res){
    //   console.log("customer is created ")
    // });

    //gender women
    const collectionProduct = client.db("shoppingdb").collection("Product");
    const product1  = new Product({
      Image: "shirt-girl-1.jpg",
      Name: "Shirt-Girl",
      Category: "Shirt",
      Gender: "Women",
      Color: "White",
      Cost: "12.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "M"
    });
    const product2  = new Product({
      Image: "shirt-girl-2.jpg",
      Name: "Shirt-Girl",
      Category: "Shirt",
      Gender: "Women",
      Color: "White",
      Cost: "20.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "L"
    });
    const product3  = new Product({
      Image: "shirt-girl-3.jpg",
      Name: "Shirt-Girl",
      Category: "Shirt",
      Gender: "Women",
      Color: "White and Black",
      Cost: "20.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "L"
    });
    const product4  = new Product({
      Image: "shirt-girl-4.jpg",
      Name: "Shirt-Girl",
      Category: "Shirt",
      Gender: "Women",
      Color: "White",
      Cost: "20.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "L"
    });
    const product5  = new Product({
      Image: "tshirt-girl-1.jpg",
      Name: "Tshirt-Girl",
      Category: "T-Shirt",
      Gender: "Women",
      Color: "White",
      Cost: "20.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "L"
    });
    const product6  = new Product({
      Image: "tshirt-girl-2.jpg",
      Name: "Tshirt-Girl",
      Category: "T-Shirt",
      Gender: "Women",
      Color: "White",
      Cost: "20.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "L"
    });
    const product7  = new Product({
      Image: "tshirt-girl-3.jpg",
      Name: "Tshirt-Girl",
      Category: "T-Shirt",
      Gender: "Women",
      Color: "Black",
      Cost: "20.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "L"
    });
    const product8  = new Product({
      Image: "tshirt-girl-4.jpg",
      Name: "Tshirt-Girl",
      Category: "T-Shirt",
      Gender: "Women",
      Color: "Pink",
      Cost: "20.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "L"
    });
    //Category Man
    const product10  = new Product({
      Image: "shirt-man-2.jpg",
      Name: "Shirt-Man",
      Category: "Shirt",
      Gender: "Man",
      Color: "Blue Dark",
      Cost: "30.3",
      Discount: "10",
      Amount: "20",
      Describe: "Made in Lao",
      Size: "XL"
    });
    const product11  = new Product({
      Image: "shirt-man-3.jpg",
      Name: "Shirt-Man",
      Category: "Shirt",
      Gender: "Man",
      Color: "Grey",
      Cost: "40.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam",
      Size: "XL"
    });
    const product12  = new Product({
      Image: "shirt-man-4.jpg",
      Name: "Shirt-Man",
      Category: "Shirt",
      Gender: "Man",
      Cost: "30.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product13  = new Product({
      Image: "tshirt-man-1.jpg",
      Name: "Tshirt-Man",
      Category: "T-Shirt",
      Gender: "Man",
      Cost: "30.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product14  = new Product({
      Image: "tshirt-man-2.jpg",
      Name: "Tshirt-Man",
      Category: "T-Shirt",
      Gender: "Man",
      Cost: "20.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product15  = new Product({
      Image: "tshirt-man-3.jpg",
      Name: "Tshirt-Man",
      Category: "Tshirt",
      Gender: "Man",
      Cost: "20.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product16  = new Product({
      Image: "tshirt-man-4.jpg",
      Name: "Tshirt-Man",
      Category: "T-Shirt",
      Gender: "Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam"
    });
    //Category sports
    const product17  = new Product({
      Image: "sport-1.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "20.3",
      Discount: "10",
      Amount: "20",
      Describe: "Made in VietNam"
    });
    const product18  = new Product({
      Image: "sport-2.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "30.3",
      Discount: "10",
      Amount: "20",
      Describe: "Made in Lao"
    });
    const product19  = new Product({
      Image: "sport-3.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "40.3",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product20  = new Product({
      Image: "sport-4.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "30.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product21  = new Product({
      Image: "sport-5.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "30.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product22  = new Product({
      Image: "sport-6.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "20.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product23  = new Product({
      Image: "sport-7.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "20.5",
      Discount: "10",
      Amount: "10",
      Describe: "Made in VietNam"
    });
    const product24  = new Product({
      Image: "sport-8.jpg",
      Name: "Sport",
      Category: "Sport",
      Gender: "Women and Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam"
    });
    //popular product
    const product25  = new Product({
      Image: "shirt-man-5.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    const product26  = new Product({
      Image: "shirt-man-6.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    const product27  = new Product({
      Image: "shirt-girl-5.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    const product28  = new Product({
      Image: "shirt-girl-7.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    const product37  = new Product({
      Image: "tshirt-man-7.jpg",
      Name: "Tshirt",
      Category: "T-Shirt",
      Gender: "Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    const product38  = new Product({
      Image: "tshirt-man-8.jpg",
      Name: "Tshirt",
      Category: "T-Shirt",
      Gender: "Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    const product39  = new Product({
      Image: "shirt-girl-6.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    const product40  = new Product({
      Image: "shirt-girl-8.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Popular'
    });
    //feature product
    const product29  = new Product({
      Image: "tshirt-man-5.jpg",
      Name: "Tshirt",
      Category: "T-Shirt",
      Gender: "Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    const product30  = new Product({
      Image: "tshirt-man-6.jpg",
      Name: "Tshirt",
      Category: "T-Shirt",
      Gender: "Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    const product31  = new Product({
      Image: "tshirt-girl-5.jpg",
      Name: "Tshirt",
      Category: "T-Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    const product32  = new Product({
      Image: "tshirt-girl-6.jpg",
      Name: "Tshirt",
      Category: "T-Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    const product41  = new Product({
      Image: "shirt-girl-9.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    const product42  = new Product({
      Image: "tshirt-girl-7.jpg",
      Name: "Tshirt",
      Category: "T-Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    const product43  = new Product({
      Image: "shirt-girl-10.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    const product44  = new Product({
      Image: "shirt-girl-11.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'Feature'
    });
    //new product
    const product33  = new Product({
      Image: "fashion-1.jpg",
      Name: "Dress",
      Category: "Dress",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    const product34  = new Product({
      Image: "fashion-2.jpg",
      Name: "Dress",
      Category: "Dress",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    const product35  = new Product({
      Image: "fashion-3.jpg",
      Name: "Dress",
      Category: "Dress",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    const product36  = new Product({
      Image: "fashion-4.jpg",
      Name: "Dress And Shirt",
      Category: "Dress and Shirt",
      Gender: "Women and Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    const product45  = new Product({
      Image: "shirt-girl-12.jpg",
      Name: "Shirt",
      Category: "Shirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    const product46  = new Product({
      Image: "fashion-5.jpg",
      Name: "Dress",
      Category: "Dress",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    const product47  = new Product({
      Image: "fashion-6.jpg",
      Name: "Skirt",
      Category: "Skirt",
      Gender: "Women",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    const product48  = new Product({
      Image: "fashion-7.jpg",
      Name: "Tshirt and Jean",
      Category: "T-Shirt and Jean",
      Gender: "Women and Man",
      Cost: "50.5",
      Discount: "10",
      Amount: "5",
      Describe: "Made in VietNam",
      Product_Group: 'New'
    });
    collectionProduct.insert([product1,product2,product3,product4,product5,product6,product7,product8, product10,
                              product11,product12,product13,product14,product15,product16,product17,product18,product19,product20,
                              product21,product22,product23,product24, product25, product26,product27,product28,product29,product30,
                              product31,product32,product33,product34,product35,product36,product37,product38,product39,product40,
                              product41,product42,product43,product44,product45,product46,product47,product48], function(err, res){
      console.log("product is created ")
    });

    // //add cart
    // const collectionCart = client.db("shoppingdb").collection("Cart");
    // const cart1  = new Cart({
    //   UserName: customer1.UserName,
    //   ProductId: product1._Id
    // });
    // const cart2 = new Cart({
    //   UserName: customer1.UserName,
    //   ProductId: product2._Id
    // });
    // const cart3 = new Cart({
    //   UserName: customer2.UserName,
    //   ProductId: product3._Id
    // });

    // console.log(cart3.UserName)

    // collectionCart.insert([cart1, cart2, cart3], function(err, res){
    //   console.log("cart is created ")
    // });
   }

});
