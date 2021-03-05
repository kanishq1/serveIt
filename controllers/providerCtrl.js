let db = require("../models/db");
module.exports.applyService = async function (req, res) {
	try {
		let id = req.user.login_id;
		// let user = await db.public.login.findOne({ where: { firebase_id: id } });
		let service = req.body.service_id;
		let docs = req.body.docs;
		const existingUser = await db.public.provider_service.findOne({
			where: { login_id: id, service_id: service },
		});
		if (existingUser) throw Error("User already applied for this service");
		const provider = await db.public.provider_service.create({ login_id: id, service_id: service, status: 0 });
		res.status(200).json({
			success: true,
			provider: provider,
			message: "Applied Successfully",
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
module.exports.acceptProviderService = async function (req, res) {
	try {
		// let id = req.user.login_id;
		let provider_id = req.body.provider_id;
		let status = req.body.status;
		const provider_accepted = await db.public.provider.update(
			{
				status: status,
			},
			{ where: { id: provider_id }, returning: true }
		);
		res.status(200).json({
			success: true,
			user: provider_accepted[1][0],
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
module.exports.getAllServicesProvider = async function (req, res) {
	try {
		let id = req.user.login_id;
		let services = await db.public.provider_service.findAll({
			where: { login_id: id },
			include: [{ model: db.public.services }],
			attributes: ["id", "service_id", "docs", "status"],
		});
		if (!services) throw Error("Not found");
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
