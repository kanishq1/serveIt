var jwt = require('jsonwebtoken');
var config = require('../config/config');
var db = require('../models/db');

module.exports.login = async function (req, res) {
  try {
    const userEmail = req.body.email;
    const userName = req.body.mobile;
    let user = await db.public.login.findOne({
      where: {
        email: userEmail,
      },
      attributes: ['id', 'email', 'created_at', 'new_user'],
    });
    // console.log(user);
    if (!user) {
      // Create a new user
      var create_object = {
        email: userEmail,
        name: userName,
      };

      db.public.login
        .create(create_object)
        .then((login_data) => {
          // The payload of the auth-token
          var auth_data = {
            email: login_data.email,
            id: login_data.id,
            created_at: login_data.created_at,
          };
          // Create and assign an auth-token
          const TOKEN_SECRET = config.app.jwtKey;
          var token = jwt.sign(auth_data, TOKEN_SECRET);
          return res.status(200).json({
            success: true,
            authToken: token,
            newUser: login_data.new_user, // newUser = true
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            msg: 'Internal server error',
          });
        });
    } else if (user) {
      // The user has already signed-in
      // The payload of the auth-token
      var auth_data = {
        email: user.email,
        id: user.id,
        created_at: user.created_at,
      };
      // Create and assign an auth-token
      const TOKEN_SECRET = config.app.jwtKey;
      var token = jwt.sign(auth_data, TOKEN_SECRET);
      return res.status(200).json({
        success: true,
        authToken: token,
        newUser: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
    });
  }
};
