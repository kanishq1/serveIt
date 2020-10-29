var db = require("../models/db");

module.exports.orderProduct = async function (req, res) {
	try {
		let order_obj = {
			order_qty: req.body.order_qty,
			value: req.body.value,
			product_name: req.body.product_name,
		};

		let order = await db.public.order.create(order_obj);

		res.status(200).json({
			success: true,
			order,
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
module.exports.getProducts = async function (req, res) {
	try {
		let order = await db.public.order.findAll();
		res.status(200).json({
			success: true,
			order,
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
