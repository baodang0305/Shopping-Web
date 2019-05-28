const express = require('express');
const router = express.Router();

router.get('/account-detail', function(req, res, next){
    res.render('account-detail', {title: 'Thông Tin Tài Khoản'});
});

module.exports = router;
