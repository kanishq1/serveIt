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
module.exports.joinCommunity = async function (req, res) {
	try {
		let id = req.user.login_id;
		let firebase_id = req.user.firebase_id;
		let community_id = req.body.community_id;
		let docs = req.body.docs;
		let user_already = await db.public.login.findOne({
			include: {
				model: db.public.community,
				attributes: ["id", "name", "description", "address"],
				where: { id: community_id },
			},
			where: { firebase_id: firebase_id },
		});
		let user = await db.public.user_community.findOne({ where: { login_id: id } });
		let loggedUser = await db.public.login.findOne({ where: { id: id } });
		if (user_already) {
			let communities = await db.public.login.findAll({
				include: {
					model: db.public.community,
					attributes: ["id", "name", "description", "address"],
				},
				where: {
					firebase_id: firebase_id,
				},
				attributes: ["id"],
			});
			let structured_communities;
			if (communities[0].id && communities[0].communities[0]) {
				structured_communities = communities.map((i, k) => {
					return Object.assign(
						{},
						{
							login_id: i.id,
							community_id: i.communities[0].id,
							community_name: i.communities[0].name,
							community_description: i.communities[0].description,
							community_address: i.communities[0].address,
							status: i.communities[0].user_community.status,
						}
					);
				});
			} else {
				structured_communities = null;
			}
			return res.status(200).json({
				success: true,
				message: "User belongs to this community already",
				communities: structured_communities,
				user_already,
			});
		}
		if (user && !user_already) {
			db.public.login
				.create({
					firebase_id: firebase_id,
					name: loggedUser.name,
					address: loggedUser.address,
					profile_pic: loggedUser.profile_pic,
					new_user: false,
					mobile: loggedUser.mobile,
					email: loggedUser.email,
					community_verified: 0,
				})
				.then(async (newUser) => {
					console.log(newUser);
					await db.public.user_community.create({
						login_id: newUser.id,
						community_id: community_id,
						docs: docs,
						status: 0,
					});
					let communities = await db.public.login.findAll({
						include: {
							model: db.public.community,
							attributes: ["id", "name", "description", "address"],
						},
						where: {
							firebase_id: firebase_id,
						},
						attributes: ["id"],
					});
					let structured_communities;
					if (communities[0].id && communities[0].communities[0]) {
						structured_communities = communities.map((i, k) => {
							return Object.assign(
								{},
								{
									login_id: i.id,
									community_id: i.communities[0].id,
									community_name: i.communities[0].name,
									community_description: i.communities[0].description,
									community_address: i.communities[0].address,
									status: i.communities[0].user_community.status,
								}
							);
						});
					} else {
						structured_communities = null;
					}
					var auth_data = {
						login_id: newUser.id,
						firebase_id: firebase_id,
						created_at: newUser.created_at,
					};

					// Create and assign an auth-token
					const TOKEN_SECRET = config.app.jwtKey;
					var token = jwt.sign(auth_data, TOKEN_SECRET);
					return res.status(200).json({
						success: true,
						authToken: token,
						newUser: newUser.new_user, // newUser = true
						role: newUser.role,
						community_verified: newUser.community_verified,
						communities: structured_communities,
						message: "Joined Successfully",
					});
				});
		} else {
			const user_joined = await db.public.user_community.create({
				login_id: id,
				community_id: community_id,
				docs: docs,
				status: 0,
			});
			const login_verify = await db.public.login.update({ community_verified: 0 }, { where: { id: id } });
			return res.status(200).json({
				success: true,
				user: user_joined,
				message: "Joined Successfully",
			});
		}
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
module.exports.acceptJoinCommunityRequest = async function (req, res) {
	try {
		// let id = req.user.login_id;
		let user_community_id = req.body.user_community_id;
		const user_accepted = await db.public.user_community.update(
			{
				status: 1,
			},
			{ where: { id: user_community_id }, returning: true }
		);
		const login_verify = await db.public.login.update(
			{ community_verified: 1 },
			{ where: { id: user_accepted[1][0].login_id } }
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
module.exports.rejectJoinCommunityRequest = async function (req, res) {
	try {
		// let id = req.user.login_id;
		let user_community_id = req.body.user_community_id;
		const user_accepted = await db.public.user_community.update(
			{
				status: 2,
			},
			{ where: { id: user_community_id }, returning: true }
		);
		const login_verify = await db.public.login.update(
			{ community_verified: 2 },
			{ where: { id: user_accepted[1][0].login_id } }
		);
		res.status(200).json({
			success: true,
			user: user_accepted[1][0],
		});
	} catch (err) {
		console.log(err);
		tus(500).json({
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
			message: "Left Community Successfully",
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

		let communities = await db.public.community.findAll({});

		res.status(200).json({
			success: true,
			communities,
			message: "Success",
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
		let communities = await db.public.community.findAll({ where: { login_id: id } });
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
module.exports.requestCommunity = async function (req, res) {
	try {
		// let id = req.body.firebase_id;
		let community_obj = {
			name: req.body.name,
			description: req.body.description,
			address: req.body.address,
			status: 0,
		};

		let community = await db.public.community.create(community_obj);

		res.status(200).json({
			message: "Community Requested Successfully",
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
