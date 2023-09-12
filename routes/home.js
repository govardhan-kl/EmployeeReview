const express = require('express');
const router = express.Router();
const passport = require('passport');
const home_controller = require('../controllers/home_controller');

router.get('/all',passport.checkAuthentication, home_controller.all);
router.get('/assign-work',passport.checkAuthentication, passport.checkAdmin, home_controller.assign_work);
router.post('/assign-work/create',passport.checkAuthentication, passport.checkAdmin, home_controller.create);
router.post('/update/:id',passport.checkAuthentication, home_controller.update);

module.exports = router;