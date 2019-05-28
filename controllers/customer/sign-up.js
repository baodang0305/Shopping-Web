const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

//require validator
const {check, validationResult} = require('express-validator/check');

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
router.get('/sign-up', function(req, res, next){
    res.render('sign-up', {title: 'Thông Tin Tài Khoản'});
});

router.post('/sign-up', 
    [
        check("absdggddffd")
            .isLength({min: 10, max: 20}).withMessage("at least 10, most 20 characters"),
        check("hoaibaodang@gmail.com")
            .isEmail()
    ],
    function(req, res){
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array());
            return;
        }

        MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
            if(err){
            console.log(err);
            }
            else{
            const collectionCustomer = client.db("shoppingdb").collection("Customer");
            
            }
    });
});

module.exports = router;