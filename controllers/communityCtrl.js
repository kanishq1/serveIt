var db = require("../models/db");

module.exports.addCommunity = async function (req, res) {
	try {
		// let id = req.body.firebase_id;
		let community_obj = {
			name: req.body.name,
			description: req.body.description,
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
		let id = req.user.login_id;
		let community_id = req.body.community_id;
		let docs = req.body.docs;
		const user_joined = await db.public.user_community.create({
			login_id: id,
			community_id: community_id,
			docs: docs,
			status: 0,
		});
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
module.exports.acceptCommunityRequest = async function (req, res) {
	try {
		// let id = req.user.login_id;
		let user_community_id = req.body.user_community_id;
		const user_accepted = await db.public.user_community.update(
			{
				status: 1,
			},
			{ where: { id: user_community_id }, returning: true }
		);
		res.status(200).json({
			success: true,
			user: user_accepted[1][0],
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
module.exports.rejectCommunityRequest = async function (req, res) {
	try {
		// let id = req.user.login_id;
		let user_community_id = req.body.user_community_id;
		const user_accepted = await db.public.user_community.update(
			{
				status: 2,
			},
			{ where: { id: user_community_id }, returning: true }
		);
		res.status(200).json({
			success: true,
			user: user_accepted[1][0],
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
		let id = req.user.login_id;
		const user_left = await db.public.user_community.destroy({ where: { login_id: id } });
		res.status(200).json({
			success: true,
			user: user_left,
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
module.exports.showCommunities = async function (req, res) {
	try {
		// let id = req.body.firebase_id;

		let communities = await db.public.community.finadAll({});

		res.status(200).json({
			success: true,
			communities,
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
module.exports.showCommunitiesUser = async function (req, res) {
	try {
		let id = req.user.login_id;
		let communities = await db.public.community.finadAll({ where: { login_id: id } });
		res.status(200).json({
			success: true,
			communities,
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
