var config = require("../config/config");
var db = require("../models/db");

module.exports.addService = async function (req, res) {
	try {
		// let chargesText =
		// 	req.body.priceType == "negotiable"
		// 		? "All prices are set by cook. This is a negotiable service. Negotiate with provider over chat, and make payment there, Serve it, deducts 10% transaction fee."
		// 		: "You will be charged. Serve-It will charge 10% as maintenance fee.";
		let service_obj = {
			name: req.body.serviceName,
			description: req.body.serviceDesc,
			questions: req.body.questions,
			price: req.body.price,
			priceType: req.body.priceType,
			additionalUnitPrice: req.body.additionalUnitPrice,
			chargesText: req.body.chargesText,
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
module.exports.getAllServices = async function (req, res) {
	try {
		let services = await db.public.services.findAll({ attributes: ["id", "name"] });
		if (!services) throw Error("No services found");
		res.status(200).json({
			success: true,
			services: services,
			message: "Success",
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
module.exports.getServiceById = async function (req, res) {
	try {
		let id = req.params.id;
		let service = await db.public.services.findOne({ where: { id } });
		if (!service) throw Error("Service not found");
		res.status(200).json({
			success: true,
			service,
			message: "Success",
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
module.exports.modifyService = async function (req, res) {
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
