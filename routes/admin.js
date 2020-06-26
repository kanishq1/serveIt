var express = require('express');
var router = express.Router();

var verify = require('../functions/verifyFunc');

var admin = require('../controllers/adminCtrl');

// The following routes are for CSA Admin
// @route         POST /admin/addAdmin
// @desc          Add another admin
router.post('/addAdmin');

// @route         POST /admin/dashboard.csa
// @desc          Dashboard for CSA
router.get('/dashboard.csa');

module.exports = router;
