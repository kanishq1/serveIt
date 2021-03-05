var config = require("../config/config");
var db = require("../models/db");
var jwt = require("jsonwebtoken");

// list communties
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
module.exports.listCommunities = async function (req, res) {
	try {
		// let id = req.body.firebase_id;

		let communities = await db.public.community.findAll({ where: { status: 1 } });

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
module.exports.listRequestedCommunities = async function (req, res) {
	try {
		// let id = req.body.firebase_id;

		let communities = await db.public.community.findAll({ where: { status: 0 } });

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
//accept and reject cmmunity add request
module.exports.changeCommunityStaus = async function (req, res) {
	try {
		// let id = req.body.firebase_id;
		let community_id = req.body.community_id;
		let status = req.body.status;
		await db.public.community.update({ status: status }, { where: { id: community_id } });

		res.status(200).json({
			success: true,
			// communities,
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

// list users
module.exports.listUsers = async function (req, res) {
	try {
		// const id = req.user.login_id;
		let user = await db.public.login.findAll({});
		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			error: "Internal server error.",
		});
	}
};
//accept user

// list providers
module.exports.listProviders = async function (req, res) {
	try {
		let services = await db.public.provider_service.findAll({
			include: [
				{ model: db.public.services, attributes: ["id", "name"] },
				{ model: db.public.login, attributes: ["id", "name", "community_id", "address"] },
			],
			attributes: ["id", "docs", "status"],
		});
		res.status(200).json({
			success: true,
			services: services,
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
//accept provide
module.exports.acceptProvider = async function (req, res) {
	try {
		// let id = req.user.login_id;
		let provider_id = req.body.provider_id;
		let provider = await db.public.provider_service.findOne({ where: { id: provider_id } });
		if (!provider) throw Error("Provider not found");
		let status = req.body.status;
		const provider_accepted = await db.public.provider_service.update(
			{
				status: status,
			},
			{ where: { id: provider_id }, returning: true }
		);
		res.status(200).json({
			success: true,
			user: provider_accepted[1][0],
		});
	} catch (err) {
		// console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				description: err.description,
			},
		});
	}
};
//reject provider
module.exports.rejectProvider = async function (req, res) {
	try {
		// let id = req.user.login_id;
		let provider_id = req.body.provider_id;
		let provider = await db.public.provider_service.findOne({ where: { id: provider_id } });
		if (!provider) throw Error("Provider not found");
		const provider_accepted = await db.public.provider_service.destroy({ where: { id: provider_id } });
		res.status(200).json({
			success: true,
			user: provider_accepted[1][0],
		});
	} catch (err) {
		// console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				description: err.description,
			},
		});
	}
};
// list services
module.exports.listService = async function (req, res) {
	try {
		let services = await db.public.services.findAll({});
		res.status(200).json({
			success: true,
			services: services,
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
//add service
module.exports.addService = async function (req, res) {
	try {
		let service_obj = {
			name: req.body.name,
			description: req.body.description,
			questions: req.body.questions,
			price: req.body.price,
			priceType: req.body.priceType,
			additionalUnitPrice: req.body.additionalUnitPrice,
		};

		let service = await db.public.services.create(service_obj);

		res.status(200).json({
			success: true,
			service: service,
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
//edit service
module.exports.editService = async function (req, res) {
	try {
		let id = req.body.service_id;

		let service_obj = {
			name: req.body.serviceName,
			description: req.body.serviceDesc,
			questions: req.body.questions,
			price: req.body.price,
			priceType: req.body.priceType,
			additionalUnitPrice: req.body.additionalUnitPrice,
		};

		let service = await db.public.service.update(service_obj, { where: { id: id }, returning: true });

		res.status(200).json({
			success: true,
			message: "service updated successfully",
			service: service[1][0],
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

// Login
module.exports.adminLogin = async function (req, res) {
	try {
		let username = req.body.username;
		let password = req.body.password;
		if (username != "admin" || password != "admin") throw Error("Invalid User");
		let auth_data = {
			user: "admin",
		};
		const TOKEN_SECRET = "badboys";
		let token = jwt.sign(auth_data, TOKEN_SECRET);
		return res.status(200).json({
			success: true,
			authToken: token,
			message: "Login Successful",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message || "Internal server error.",
		});
	}
};
