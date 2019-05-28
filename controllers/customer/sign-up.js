const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const customer = require('../../models/customer');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

// Create a schema
const schemaPassword = new passwordValidator();
const scheam = new passwordValidator();

// Add properties to it
schemaPassword
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
//.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
//.has().not().spaces()                           // Should not have spaces
//.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

scheam
.is().min(2)
.is().max(50)

const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";
router.get('/sign-up', function(req, res, next){
    res.render('sign-up', {title: 'Thông Tin Tài Khoản'});
});

router.post('/sign-up',function(req, res){
        MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
            if(err){
            console.log(err);
            }
            else{
                if(schemaPassword.validate(req.body.Password) && scheam.validate(req.body.Username) 
                   && scheam.validate(req.body.Name) && scheam.validate(req.body.Address) 
                   && scheam.validate(req.body.PhoneNumber) && scheam.validate(req.body.Email))
                {
                    const collectionCustomer = client.db("shoppingdb").collection("Customer");
                    req.body.Password = bcrypt.hashSync(req.body.Password, 10);
                    const cus = new customer(req.body);
                    collectionCustomer.insertOne(cus, function(err, res){
                        console.log("customer is added ");
                    });
                    res.redirect('/')
                }
                else{
                    res.redirect('/sign-up');
                }
            }
    });
});

module.exports = router;