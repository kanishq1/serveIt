var config = require("../config/config");
var db = require("../models/db");
var jwt = require("jsonwebtoken");
module.exports.addCommunity = async function (req, res) {
	try {
		// let id = req.body.firebase_id;
		let community_obj = {
			name: req.body.name,
			description: req.body.description,
			address: req.body.address,
			status: 1,
		};

		let community = await db.public.community.create(community_obj);

		res.status(200).json({
			message: "Community Added Successfully",
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
module.exports.removeCommunity = async function (req, res) {
	try {
		let community = req.body.community_id;

		await db.public.user_community.destroy({ where: { community_id: community } });
		await db.public.login.destroy({ where: { community_id: community } });
		await db.public.community.destroy({ where: { id: community } });
		res.status(200).json({
			success: true,
			message: "Removed Community Successfully",
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
// list communties
// list users
// list services
// list providers
