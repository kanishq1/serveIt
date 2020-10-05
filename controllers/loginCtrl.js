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
			attributes: ["id", "email", "created_at", "new_user", "role", "verified"],
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
						login_id: login_data.id,
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
						role: login_data.role,
						verified: login_data.verified.verified,
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
				login_id: user.id,
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
				role: user.role,
				verified: user.verified.verified,
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
		let id = req.user.login_id;
		let user_obj = {
			name: req.body.name,
			address: req.body.address,
			profile_pic: req.body.profile_pic,
			new_user: false,
		};
		const user_updated = await db.public.login.update(user_obj, { where: { login_id: id }, returning: true });
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
		let links_obj = {
			links: req.body.links,
		};
		const user_updated = await db.public.login.update(links_obj, { where: { firebase_id: id }, returning: true });
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
module.exports.verifyUser = async function (req, res) {
	try {
		let id = req.user.firebase_id;
		let verify_obj = { verified: req.body.verified };
		const user_updated = await db.public.login.update(verify_obj, { where: { firebase_id: id }, returning: true });
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
module.exports.checkVerify = async function (req, res) {
	try {
		let id = req.user.firebase_id;
		let verified = await db.public.login.findOne({
			where: {
				firebase_id: id,
			},
			attributes: ["verified"],
		});
		res.status(200).json({
			success: true,
			data: verified.verified,
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
