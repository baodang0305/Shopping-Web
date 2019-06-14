var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";
var CommentModel = require('../../models/comment');
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
        let related_comment_array = await collectionComment.find({Product: object_id}).toArray();
        let all_product_related = await collectionProduct.find({Category: product_detail.Category, Gender: product_detail.Gender}).toArray();

        dbRef.close();
        
        let alteredCommentArray = []
        for (i = 0; i < related_comment_array.length; i++) {
          let commentModel = new CommentModel()
          let alteredComment = commentModel.changeStarFromIntToStringToEmbeddedToHandlebar(related_comment_array[i])
          alteredCommentArray.push(alteredComment)
        }

        res.render('product-detail', { title: 'Product Detail',
        isLogin: Boolean(req.user),
        user: req.user,
        product_detail: product_detail,
        all_product: all_product,
        hasComment: Boolean(alteredCommentArray),
        related_comment: alteredCommentArray,
        'all_product_related': all_product_related
        });
        
      })();
    }
  });
});

module.exports = router;
