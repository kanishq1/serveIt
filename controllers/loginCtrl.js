var jwt = require("jsonwebtoken");
var config = require("../config/config");
var db = require("../models/db");

module.exports.login = async function (req, res) {
	try {
		const userId = req.body.id;
		let user = await db.public.login.findOne({
			where: {
				firebase_id: userId,
			},
			attributes: ["id", "email", "created_at", "new_user"],
		});
		// console.log(user);
		if (!user) {
			// Create a new user
			var create_object = {
				firebase_id: userId,
			};

			db.public.login
				.create(create_object)
				.then((login_data) => {
					// The payload of the auth-token
					var auth_data = {
						firebase_id: userId,
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
						msg: "Internal server error",
					});
				});
		} else if (user) {
			// The user has already signed-in
			// The payload of the auth-token
			var auth_data = {
				firebase_id: userId,
				created_at: user.created_at,
			};
			// Create and assign an auth-token
			const TOKEN_SECRET = config.app.jwtKey;
			var token = jwt.sign(auth_data, TOKEN_SECRET);
			return res.status(200).json({
				success: true,
				authToken: token,
				newUser: user.new_user,
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			error: "Internal server error.",
		});
	}
};

module.exports.update = async function (req, res) {
	try {
		let id = req.user.firebase_id;
		let user_obj = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			address: req.body.address,
			new_user: false,
		};
		const user_updated = await db.public.login.update(user_obj, { where: { firebase_id: id }, returning: true });
		res.status(200).json({
			success: true,
			user: user_updated[1][0],
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: "Internal Server Error",
				description: err.description,
			},
		});
	}
};
module.exports.updateLink = async function (req, res) {
	try {
		let id = req.user.firebase_id;
		let user_obj = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			address: req.body.address,
			new_user: false,
		};
		const user_updated = await db.public.login.update(user_obj, { where: { firebase_id: id }, returning: true });
		res.status(200).json({
			success: true,
			user: user_updated[1][0],
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: "Internal Server Error",
				description: err.description,
			},
		});
	}
};
