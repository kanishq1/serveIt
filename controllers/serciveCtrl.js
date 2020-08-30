var config = require("../config/config");
var db = require("../models/db");

async function addService(req, res) {
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
}

async function getAllServices(req, res) {
	try {
		let query = {};

		if (req.query.key) {
			query.key = req.query.key;
		}

		let values = await db.public.kv.findAll({
			where: query,
		});

		res.status(200).json({
			success: true,
			kv: values,
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
}

module.exports = {
	create,
	get,
};
