const express = require('express');
// const User = require('../models/users');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('login');
});

module.exports = router;
