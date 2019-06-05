var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.post('/add-review', function(req, res, next){
  var object_id = new ObjectId(req.body.Product);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
    if (err) {
      console.log(err);
    } else {
      let collectionComment = dbRef.db("shoppingdb").collection("Comment");

      let newComment = {
        Star: req.body.starValue,
        Username: req.user ? req.user.Username : req.body.Name,
        Text: req.body.Message,
        Time: Date.now(),
        Product: object_id
      }

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
