var db = require("../models/db");
const provider = require("../models/public/provider");

module.exports.requestService = async function (req, res) {
	try {
		let request_obj = {
			reciever_id: req.user.firebase_id,
			service_id: req.body.service_id,
			answers: req.body.answers,
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
		let accept_request_obj = {
			provider_id: req.user.firebase_id,
		};

		let request = await db.public.request.update(accept_request_obj, {
			where: { id: id },
			returning: true,
		});

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
		let reciever_id = req.user.firebase_id;
		let is_user_true = await db.public.request.findOne({
			where: { reciever_id: reciever_id, id: id },
		});
		if (!is_user_true) {
			return res.status(200).json({
				success: true,
				msg: "You are not the user",
			});
		}
		let request = await db.public.request.destroy({ where: { id: id } });

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
		let provider_id = req.user.firebase_id;
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
			{ provider_id: null },
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
		let request = await db.public.request.findAll({ include: db.public.provider });

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
		let provider_id = req.user.firebase_id;
		let request = await db.public.request.findAll({ where: { provider_id: provider_id } });

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
		let reciever_id = req.user.firebase_id;
		let request = await db.public.request.findAll({ where: { reciever_id: reciever_id } });

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
