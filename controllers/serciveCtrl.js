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
		const services = [
			{ id: "1", name: "service1", desc: "desc1" },
			{ id: "2", name: "service2", desc: "desc2" },
			{ id: "3", name: "service3", desc: "desc3" },
			{ id: "4", name: "service4", desc: "desc4" },
			{ id: "5", name: "service5", desc: "desc5" },
			{ id: "6", name: "service6", desc: "desc6" },
		];
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
