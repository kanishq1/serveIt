var db = require("../models/db");
const geolib = require("geolib");
const stripe = require("stripe")(
	"sk_test_51HWYZGEaJxDKrnTlrIyFbt2eKBjUuhgj8HoV0sm1izOKZnDLeggS1DGaCN97L3gKIpxTmouLRCVBdROeugpBrr9z00SLkgl8PF"
);
module.exports.requestService = async function (req, res) {
	try {
		let reciver_community = await db.public.user_community.findOne({ where: { login_id: req.user.login_id } });
		if (!reciver_community) throw Error("Reciever community not found");
		if (!req.body.service_id) throw Error("Please enter service id");
		if (!req.body.answers) throw Error("Please enter answers");
		if (!req.body.type) throw Error("Please enter type");
		let request_obj = {
			reciever_id: req.user.login_id,
			service_id: req.body.service_id,
			answers: req.body.answers,
			time: req.body.time,
			type: req.body.type,
			price: req.body.price,
			instructions: req.body.instructions,
			certificateRequired: req.body.certificateRequired,
			reciver_community: reciver_community.community_id,
			status: 0,
		};
		// let is_repeat = await db.public.request.findOne({
		// 	where: { reciever_id: request_obj.reciever_id, service_id: request_obj.service_id },
		// });
		// if (is_repeat) {
		// 	res.status(200).json({
		// 		success: true,
		// 		message: "Request already made",
		// 	});
		// 	return;
		// }
		let request = await db.public.request.create(request_obj);

		res.status(200).json({
			success: true,
			request,
			message: "Successfully requested",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				description: err.description,
			},
		});
	}
};
module.exports.acceptService = async function (req, res) {
	try {
		let id = req.body.request_id;
		let provider_id = req.user.login_id;
		let provider_community = await db.public.user_community.findOne({ where: { login_id: provider_id } });
		if (!provider_community) throw Error("Provider community not found");
		let provider_service = await db.public.provider_service.findOne({ where: { login_id: provider_id } });
		let request = await db.public.request.update(
			{
				provider_service_id: provider_service.id,
				provider_community: provider_community.community_id,
				status: 1,
				provider_id,
			},
			{
				where: { id: id },
				returning: true,
			}
		);

		res.status(200).json({
			success: true,
			request: request[1][0],
			message: "Accepted Successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				description: err.description,
			},
		});
	}
};
module.exports.cancelServiceReciever = async function (req, res) {
	try {
		let id = req.body.request_id;
		let reciever_id = req.user.login_id;
		let is_user_true = await db.public.request.findOne({
			where: { reciever_id: reciever_id, id: id },
		});
		if (!is_user_true) throw Error("You are not the user");
		let request = await db.public.request.update({ status: -1 }, { where: { id: id, type: "scheduled" } });
		if (!request) throw Error("Failed");

		res.status(200).json({
			success: true,
			message: "deleted",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				description: err.description,
			},
		});
	}
};
module.exports.cancelServiceProvider = async function (req, res) {
	try {
		let id = req.body.request_id;
		let provider_id = req.user.login_id;
		let is_user_true = await db.public.request.findOne({
			where: { provider_id: provider_id, id: id },
		});
		if (!is_user_true) throw Error("You are not the user");

		let request = await db.public.request.update({ status: -1 }, { where: { id: id } });
		if (!request) throw Error("Failed");

		res.status(200).json({
			success: true,
			message: "canceled successfully",
			// request: request[1][0],
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				description: err.description,
			},
		});
	}
};
module.exports.showService = async function (req, res) {
	try {
		let request = await db.public.request.findAll({
			include: [
				{
					model: db.public.provider_service,
					attributes: ["login_id"],
					include: { model: db.public.login, attributes: ["name", "profile_pic"] },
				},
				{ model: db.public.login, as: "reciever", attributes: ["id", "name", "profile_pic"] },
				{ model: db.public.services },
			],
			attributes: [
				"id",
				"answers",
				"completed_at",
				"created_at",
				"price",
				"status",
				"time",
				"provider_id",
				"reciever_id",
				"provider_community",
				"reciver_community",
			],
		});

		res.status(200).json({
			success: true,
			request,
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
module.exports.showServiceProvider = async function (req, res) {
	try {
		let provider_id = req.user.login_id;
		let request = await db.public.request.findAll({
			include: [
				{ model: db.public.login, as: "reciever", attributes: ["id", "name", "profile_pic"] },
				{ model: db.public.services },
			],
			where: { provider_id: provider_id },
			attributes: [
				"id",
				"answers",
				"completed_at",
				"created_at",
				"price",
				"status",
				"time",
				"provider_id",
				"reciever_id",
				"provider_community",
				"reciver_community",
			],
		});

		res.status(200).json({
			success: true,
			request,
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
module.exports.showServiceReciever = async function (req, res) {
	try {
		let reciever_id = req.user.login_id;
		console.log(reciever_id);
		let request = await db.public.request.findAll({
			include: [
				{
					model: db.public.provider_service,
					attributes: ["id", "login_id"],
					include: { model: db.public.login, attributes: ["name", "profile_pic"] },
				},
				{ model: db.public.services },
			],
			where: { reciever_id: reciever_id },
			attributes: [
				"id",
				"answers",
				"completed_at",
				"created_at",
				"price",
				"status",
				"time",
				"provider_id",
				"reciever_id",
				"provider_community",
				"reciver_community",
			],
		});

		res.status(200).json({
			success: true,
			request,
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
module.exports.updateStatus = async function (req, res) {
	try {
		let id = req.body.request_id;
		let status = req.body.status;
		let status_update = await db.public.request.update({ status: status }, { where: { id: id } });
		res.status(200).json({
			success: true,
			msg: status_update[1][0],
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
module.exports.findDistance = async function (req, res) {
	try {
		let position = {
			coords: { latitude: 51.5103, longitude: 7.49347 },
		};
		console.log(
			"You are ",
			geolib.getDistance(position.coords, {
				latitude: 51.525,
				longitude: 7.4575,
			}),
			"meters away from 51.525, 7.4575"
		);

		res.status(200).json({
			success: true,
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
module.exports.servicesAvailabeNow = async function (req, res) {
	try {
		let provider_id = req.user.login_id;
		if (!provider_id) throw Error("Invalid Token");
		let provider_community = await db.public.user_community.findOne({ where: { login_id: provider_id } });
		if (!provider_community) throw Error("Community of user not found");

		let available = await db.public.request.findAll({
			include: [
				{ model: db.public.login, as: "reciever", attributes: ["id", "name", "profile_pic", "address"] },
				{ model: db.public.services, attributes: ["id", "name", "description", "questions", "priceType"] },
			],
			where: { reciver_community: provider_community.community_id, provider_id: null },
			attributes: [
				"id",
				"answers",
				"created_at",
				"price",
				"type",
				"status",
				"instructions",
				"time",
				"reciever_id",
				"reciver_community",
			],
		});
		if (!available) throw Error("No available services");

		res.status(200).json({
			success: true,
			available,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			error: {
				message: err.message || "Internal Server Error",
				description: err.description,
			},
		});
	}
};
module.exports.payment = async function (req, res) {
	try {
		stripe.customers
			.create({
				name: req.body.name,
				email: req.body.email,
				source: "tok_visa",
				description: "hey",
			})
			.then((customer) =>
				stripe.charges.create({
					amount: req.body.amount * 100,
					currency: "inr",
					customer: customer.id,
				})
			)
			.then((charge) => {
				res.status(200).json({
					success: true,
					charge,
				});
			})
			.catch((err) => {
				res.status(500).json({
					success: true,
					err,
				});
				console.log(err);
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
