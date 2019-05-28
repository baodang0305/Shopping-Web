const express = require('express');
const router = express.Router();

router.get('/forgot-password', function(req, res, next){
    res.render('forgot-password', {title: 'Quên Mật Khẩu'});
});

module.exports = router;