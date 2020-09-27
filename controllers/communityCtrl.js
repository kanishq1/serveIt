var db = require("../models/db");

module.exports.addCommunity = async function (req, res) {
	try {
		// let id = req.body.firebase_id;
		let community_obj = {
			name: req.body.name,
			// a: req.body.description,
			address: req.body.address,
		};

		let community = await db.public.community.create(community_obj);

		res.status(200).json({
			success: true,
			community,
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

module.exports.joinCommunity = async function (req, res) {
	try {
		let id = req.user.firebase_id;
		let community_id = req.body.community_id;
		const user_joined = await db.public.user_community.create({ login_id: id, community_id: community_id });
		res.status(200).json({
			success: true,
			user: user_joined,
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
module.exports.leaveCommunity = async function (req, res) {
	try {
		let id = req.user.firebase_id;
		let community_id = -1;
		const user_joined = await db.public.login.update(
			{ community_id },
			{ where: { firebase_id: id }, returning: true }
		);
		res.status(200).json({
			success: true,
			user: user_joined[1][0],
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
module.exports.showCommunity = async function (req, res) {
	try {
		// let id = req.body.firebase_id;
		let community_obj = {
			name: req.body.name,
			// a: req.body.description,
			address: req.body.address,
		};

		let community = await db.public.community.create(community_obj);

		res.status(200).json({
			success: true,
			community,
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
