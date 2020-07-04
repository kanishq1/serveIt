const express = require('express');
const Name = require('../models/test');

const router = express.Router();

/* GET all Names */
router.get('/allNames', async function (req, res, next) {
  try {
    const names = await Name.find();
    res.status(200).send(names);
    // console.log(res);
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

/* Add new Name */
router.post('/addName', async function (req, res, next) {
  try {
    const name = new Name(req.body);
    await name.save();
    console.log(res);
    res.status(200).send(name);
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
