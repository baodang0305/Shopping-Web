var ObjectId = require('mongodb').ObjectId;

module.exports = function CommentModel() {
  this.Star = 0
  this.Username = ""
  this.Text = ""
  this.Time = ""
  this.Product = new ObjectId()

  this.createNewComment = function(req) {
      this.Star = Number(req.body.star),
      this.Username = req.user ? req.user.Username : req.body.Name,
      this.Text = req.body.Message,
      this.Time = new Date().yyyymmdd(),
      this.Product = new ObjectId(req.body.Product)
  }

  this.changeStarFromIntToStringToEmbeddedToHandlebar = function(comment) {
    let commentAltered = {
      Star: numberofStarToString(comment.Star),
      Username: comment.Username,
      Text: comment.Text,
      Time: comment.Time,
      Product: comment.Product
    }
    return commentAltered
  }
}

const numberofStarToString = function(numberOfStar) {
  var starList = ["-o", "-o", "-o", "-o", "-o"];
  for (let i = 0; i < Number(numberOfStar); i++) {
    starList[i] = "";
  }
  return starList
}

Date.prototype.yyyymmdd = function() {
  var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = this.getDate().toString();

  return [this.getFullYear(), '-', mm.length===2 ? '' : '0', mm, '-', dd.length===2 ? '' : '0', dd].join(''); // padding
};
