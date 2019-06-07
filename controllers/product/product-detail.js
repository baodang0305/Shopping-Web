var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
// var csrf = require('csurf');
//
//
// var csrfProtection = csrf();
// router.use(csrfProtection);

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

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
        let product_detail = await collectionProduct.findOne({_id: object_id});
        let all_product = await collectionProduct.find({}).toArray();
        let related_comment = await collectionComment.find({Product: object_id}).toArray();
        let all_product_related = await collectionProduct.find({Category: product_detail.Category, Gender: product_detail.Gender}).toArray();

        dbRef.close();

        
        if (related_comment[0]) {
          var starList = ["-o", "-o", "-o", "-o", "-o"];
          for (let i = 0; i < Number(related_comment[0].Star); i++) {
            starList[i] = "";
          }
          res.render('product-detail', { title: 'Product Detail',
        isLogin: Boolean(req.user),
        user: req.user,
        product_detail: product_detail,
        all_product: all_product,
        related_comment: related_comment,
        starList: starList,
        'all_product_related': all_product_related
        //khoan, chưa lưu kìa.chú ý luu trc khi chạy lại m luu di m

          });
        } else {
          res.render('product-detail', { title: 'Product Detail',
        isLogin: Boolean(req.user),
        user: req.user,
        product_detail: product_detail,
        all_product: all_product,
        'all_product_related': all_product_related
      });
        }
      })();
    }
  });
});

module.exports = router;
