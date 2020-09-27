var config = require("../config/config");
var db = require("../models/db");

module.exports.addService = async function (req, res) {
	try {
		let id = req.body.firebase_id;
		let service_obj = {
			name: req.body.serviceName,
			description: req.body.serviceDesc,
		};

		let service = await db.public.service.create(service_obj);

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

module.exports.getAllServices = async function (req, res) {
	try {
		let services = await db.public.services.findAll();
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
module.exports.joinServices = async function (req, res) {
	try {
		let id = req.user.firebase_id;
		// let user = await db.public.login.findOne({ where: { firebase_id: id } });
		let service = req.body.service_id;
		const provider = await db.public.provider.create({ login_id: id, service_id: service });
		res.status(200).json({
			success: true,
			provider: provider,
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
