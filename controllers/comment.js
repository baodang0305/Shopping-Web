var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

var CommentModel = require('../models/comment');

router.post('/add-review', function(req, res, next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
    if (err) {
      console.log(err);
    } else {
      let collectionComment = dbRef.db("shoppingdb").collection("Comment");

      let newComment = new CommentModel()

      newComment.createNewComment(req)

      collectionComment.insertOne(newComment, function(err, comment) {

        dbRef.close();

        if (err) {
          console.log(err)
        }
        else {
          res.redirect('/product-detail-' + req.body.Product)
        }
      })
    }
  });
});

module.exports = router;
