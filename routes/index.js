// The routes should be later split into individual files.
var express = require('express');
var router = express.Router();

var passport = require('passport');

// var themes = require("../controllers/themeCtrl");
// var atcStrip = require("../controllers/atcStripCtrl");
var login = require('../controllers/loginCtrl');
// var atc = require("../controllers/atc-strips-no-cache");
var crud = require('../controllers/crud');

// @route
// @description   This routes identifies the user authenticated
//                by google and logs-in/creates a new profile for the user.

// @route         POST /api/v1/profile/create
// @desc   This route generates the profile as
//                soon as the user is authenticated by google.
// router.post('/profile/create', profile.generate);
// router.post('/profile/update', profile.update);
// router.delete('/profile/delete', profile.delete);

// router.post('/admin/signin', googleSignin.testAdminGoogle);
// router.post('/google/admin/signin', googleSignin.checkAdminGoogle);

// The following routes are for CSA Admin
// @route         POST /admin/addAdmin
// @desc          Add another admin
// router.post('/admin/addAdmin', verify.roleCSA, admin.addAdmin);

// The following routes are for user dashboard
// @routes        POST /user/dashboard
// @desc          Get Dashboard
router.get('/user/dashboard');
router.get('/user/dashboard.v2.enlim');
router.get('/user/dashboard.v2');

router.post('/create/kv', crud.create);
router.get('/get/kv', crud.get);

module.exports = router;
