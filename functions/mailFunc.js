"use strict";
const nodemailer = require("nodemailer");
const { gmail } = require("googleapis/build/src/apis/gmail");
const Mailgen = require("mailgen");
const mail = async () => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: "gmail",
		// port: 587,
		// secure: false, // true for 465, false for other ports
		auth: {
			user: "kanishqkhandelwal@gmail.com", // generated ethereal user
			pass: "iamkanishq", // generated ethereal password
		},
		// tls: {
		// 	rejectUnauthorized: false,
		// },
	});
	let MailGenerator = new Mailgen({
		theme: "default",
		product: {
			name: "hello",
			link: "abc.com",
		},
	});

	let response = {
		body: {
			name: "ServeIt",
			intro: "Welcome to Nodemailer! We're very excited to have you on board.",
		},
	};

	let mail = MailGenerator.generate(response);

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <kanishqkhandelwal@gmail.com>', // sender address
		to: "info.kanishqk@gmail.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: mail, // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

mail().catch(console.error);
