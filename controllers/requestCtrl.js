var db = require("../models/db");
const geolib = require("geolib");

module.exports.requestService = async function (req, res) {
	try {
		let reciver_community = await db.public.user_community.findOne({ where: { login_id: req.user.login_id } });
		let request_obj = {
			reciever_id: req.user.login_id,
			service_id: req.body.service_id,
			answers: req.body.answers,
			time: req.body.time,
			reciver_community: reciver_community.community_id,
			status: 0,
		};
		let is_repeat = await db.public.request.findOne({
			where: { reciever_id: request_obj.reciever_id, service_id: request_obj.service_id },
		});
		if (is_repeat) {
			res.status(200).json({
				success: true,
				msg: "Request already made",
			});
			return;
		}
		let request = await db.public.request.create(request_obj);

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
module.exports.acceptService = async function (req, res) {
	try {
		let id = req.body.request_id;
		let provider_id = req.user.login_id;
		let provider_community = await db.public.user_community.findOne({ where: { login_id: provider_id } });
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
module.exports.cancelServiceReciever = async function (req, res) {
	try {
		let id = req.body.request_id;
		let reciever_id = req.user.login_id;
		let is_user_true = await db.public.request.findOne({
			where: { reciever_id: reciever_id, id: id },
		});
		if (!is_user_true) {
			return res.status(200).json({
				success: true,
				msg: "You are not the user",
			});
		}
		let request = await db.public.request.update({ status: -1 }, { where: { id: id } });

		res.status(200).json({
			success: true,
			msg: "deleted",
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
module.exports.cancelServiceProvider = async function (req, res) {
	try {
		let id = req.body.request_id;
		let provider_id = req.user.login_id;
		let is_user_true = await db.public.request.findOne({
			where: { provider_id: provider_id, id: id },
		});
		if (!is_user_true) {
			return res.status(200).json({
				success: true,
				msg: "You are not the user",
			});
		}
		let request = await db.public.request.update(
			{ provider_id: null, provider_community: null },
			{
				where: { id: id },
				returning: true,
			}
		);

		res.status(200).json({
			success: true,
			msg: "canceled successfully",
			request: request[1][0],
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
			],
			attributes: [
				"id",
				"answers",
				"completed_at",
				"created_at",
				"rate",
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
			include: { model: db.public.login, as: "reciever", attributes: ["id", "name", "profile_pic"] },
			where: { provider_id: provider_id },
			attributes: [
				"id",
				"answers",
				"completed_at",
				"created_at",
				"rate",
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
		let request = await db.public.request.findAll({
			include: [
				{
					model: db.public.provider_service,
					attributes: ["id", "login_id"],
					include: { model: db.public.login, attributes: ["name", "profile_pic"] },
				},
			],
			where: { reciever_id: reciever_id },
			attributes: [
				"id",
				"answers",
				"completed_at",
				"created_at",
				"rate",
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
		// let reciever_id = req.user.login_id;
		// let is_user_true = await db.public.request.findOne({
		// 	where: { reciever_id: reciever_id, id: id },
		// });
		// if (!is_user_true) {
		// 	return res.status(200).json({
		// 		success: true,
		// 		msg: "You are not the user",
		// 	});
		// }
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
