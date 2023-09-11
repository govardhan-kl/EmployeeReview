const express = require('express');
const router = express.Router();


router.get('/',function(req,res){
    res.redirect('/users/signin')
})

router.use('/home',require('./home'))
router.use('/users',require("./users"));
module.exports = router;