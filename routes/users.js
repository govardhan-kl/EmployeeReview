const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const passport = require('passport');

router.get('/signin', user_controller.signIn)
router.get('/signup',user_controller.signUp)

router.post('/create', user_controller.create);
router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
) , user_controller.login);
router.get('/signout', user_controller.destroySession)

module.exports = router