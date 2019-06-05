var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
// var csrf = require('csurf');
//
//
// var csrfProtection = csrf();
// router.use(csrfProtection);

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/product-detail-:id', function(req, res, next){
  var id = req.params.id;
  var object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = dbRef.db("shoppingdb").collection("Product");
      const collectionComment = dbRef.db("shoppingdb").collection("Comment");
      (async()=>{
        let product_detail = await collectionProduct.find({_id: object_id}).toArray();
        let all_product = await collectionProduct.find({}).toArray();
        let related_comment = await collectionComment.find({Product: object_id}).toArray();

        dbRef.close();

        var starList = ["-o", "-o", "-o", "-o", "-o"];
        for (let i = 0; i < Number(related_comment[0].Star); i++) {
          starList[i] = "";
        }
        console.log(related_comment[0])
        console.log(related_comment[0].Star)
        console.log(starList)
        res.render('product-detail', { title: 'Product Detail',
        isLogin: Boolean(req.user),
        user: req.user,
        product_detail: product_detail,
        all_product: all_product,
        related_comment: related_comment,
        starList: starList
      });
      })();
    }
  });
});

module.exports = router;
