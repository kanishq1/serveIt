var db = require("../models/db");
var policies = require("./policies.initial");

// let users = [];

async function public_force(testing) {
	if (!testing) {
		console.log("Public force executed");
	}
	let user, service, user_community, community, provider;

	community = await db.public.community.create({
		name: "test community",
		description: "this is a test community",
		address: {
			latitude: "9405",
			locality: "test locality",
			longitude: "9405",
			"any other info": "adh",
		},
		status: 1,
	});

	// Adding the permissions for the site admin
	user = await db.public.login.create({
		name: "Master",
		last_name: "Admin",
		sex: 1,
		firebase_id: "1",
		role: 1,
		verified: {
			verified: true,
		},
		new_user: false,
	});
	// user_community = await db.public.user_community({

	// })
	service = await db.public.services.create({
		name: "Baby Sitting",
		priceType: "fixed",
		chargesText: "You will be charged. Serve-It will charge 10% as maintenance fee.",
		description: "Any Description Here",
		certificateRequired: true,
		price: 10,
		questions: [
			{ id: 1, question: "Amount", text: "Number of children", type: "integer", price: 5 },
			{
				id: 2,
				question: "Duration",
				text: null,
				type: "mcq",
				options: { "5hr": 5, "8hr": 7, "10hr": 8, "24hr": 15 },
			},
			{
				id: 3,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Full : Feeding Bathing Watching": 20,
					"Watching Only": 10,
					"Feeding & Watching": 15,
					"Bathing and Watching": 10,
				},
			},
		],
	});
	await db.public.services.create({
		name: "Care Giving",
		priceType: "fixed",
		chargesText: "You will be charged. Serve-It will charge 10% as maintenance fee.",
		certificateRequired: true,
		price: 10,
		questions: [
			// { id: 1, question: "Amount", text: "Number of children", type: "integer", price: 5 },
			{
				id: 1,
				question: "Duration",
				text: null,
				type: "mcq",
				options: { "5hr": 5, "8hr": 7, "10hr": 8, "24hr": 15 },
			},
			{
				id: 2,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Full : Feeding, Bathing, Watching": 20,
					"Watching Only": 10,
					"Bathing Only": 10,
					"Fedding Only": 10,
					"Feeding & Watching": 15,
					"Feeding & Bathing": 15,
					"Bathing and Watching": 10,
				},
			},
		],
	});
	await db.public.services.create({
		name: "Hair Dressing",
		priceType: "negotiable",
		chargesText:
			"All prices are set by hair dresser. This is a negotiable service. Negotiate with provider over chat, and make payment there, Serve it, deducts 10% transaction fee.",
		certificateRequired: true,
		price: 0,
		questions: [
			// { id: 1, question: "Amount", text: "Number of children", type: "integer", price: 5 },
			{
				id: 1,
				question: "Type",
				text: null,
				type: "mcq",
				options: { Hairdresser: 0, Barber: 0 },
			},
			{
				id: 2,
				question: "Hairdresser",
				text: null,
				type: "mmcq",
				options: {
					"Full styling": 0,
					"Process Washing": 0,
					"Only Cutting": 0,
					"Only Braiding": 0,
					"Only Custom": 0,
				},
			},
			{
				id: 3,
				question: "Barber",
				text: null,
				type: "mmcq",
				options: {
					"Full styling": 0,
					"Haircut Only": 0,
					"Shave Only": 0,
				},
			},
		],
	});
	await db.public.services.create({
		name: "Car wash",
		priceType: "fixed",
		certificateRequired: true,
		price: 10,
		questions: [
			// { id: 1, question: "Amount", text: "Number of children", type: "integer", price: 5 },
			{
				id: 1,
				question: "Vehicle Type",
				text: null,
				type: "mcq",
				options: { Car: 0, Suv: 0 },
			},
			{
				id: 2,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Full Service : Wash/Vacuum ": 20,
					"Wash outside only": 15,
					"Inside wipe/vacuum only": 15,
				},
			},
		],
	});
	await db.public.services.create({
		name: "Handyman",
		priceType: "fixed",
		chargesText: "You will be charged. Serve-It will charge 10% as maintenance fee.",
		certificateRequired: true,
		price: 10,
		questions: [
			{
				id: 1,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Fix Toilet": 20,
					"Change Bulb": 10,
					"Move appliances": 25,
					"Move furniture": 15,
					"Garbage Disposal": 15,
					"Replace / FixPaint Wall": 20,
					"Unclog drain": 20,
					"Install Washer / DryerMoving to lout": 20,
				},
			},
		],
	});
	await db.public.services.create({
		name: "House Keeping",
		priceType: "fixed",
		chargesText: "You will be charged. Serve-It will charge 10% as maintenance fee.",
		certificateRequired: true,
		price: 10,
		questions: [
			// { id: 1, question: "Amount", text: "Number of children", type: "integer", price: 5 },
			{
				id: 1,
				question: "Size of apartment",
				text: null,
				type: "mcq",
				options: { "1 Bedroom": 10, "2 Bedroom": 15, "3 Bedroom": 20 },
			},
			{
				id: 2,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Full Service : All rooms": 20,
					"Bedrooms and Bathrooms only": 15,
					"Bedroom only": 10,
					"Bathroom only": 10,
					"Livingroom & kitchen only": 15,
					"Livingroom only": 10,
					"Kitchen only": 10,
					"Take Trash out": 5,
				},
			},
			{
				id: 3,
				question: "Laundry",
				text: null,
				type: "mmcq",
				options: {
					"Full Service : Washing, Drying": 10,
					"Folding, Ironing": 10,
				},
			},
			{ id: 4, question: "More Options", text: "Additional room", type: "integer", price: 10 },
		],
	});
	await db.public.services.create({
		name: "Cooking",
		priceType: "negotiable",
		chargesText:
			"All prices are set by cook. This is a negotiable service. Negotiate with provider over chat, and make payment there, Serve it, deducts 10% transaction fee.",
		certificateRequired: true,
		price: 0,
		questions: [
			// { id: 1, question: "Amount", text: "Number of children", type: "integer", price: 5 },
			{
				id: 1,
				question: "Options",
				text: null,
				type: "mmcq",
				options: { "Cooking what is available": 0, "Pre Cooked": 0, Vegan: 0 },
			},
			{ id: 2, question: "Size", text: "Meals", type: "integer", price: 0 },
			{
				id: 3,
				question: "Style",
				text: null,
				type: "mmcq",
				options: {
					American: 0,
					Asian: 0,
					Indian: 0,
					Jamaican: 0,
					Italian: 0,
					Mexican: 0,
					Hatian: 0,
				},
			},
		],
	});
	await db.public.services.create({
		name: "Shopping",
		priceType: "fixed",
		chargesText: "You will be charged. Serve-It will charge 10% as maintenance fee.",
		certificateRequired: true,
		price: 10,
		questions: [
			{
				id: 1,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Prepaid shopping list for groceries": 15,
					"Prepaid shopping list moves": 15,
					"Prepaid shopping for food": 15,
				},
			},
		],
	});
	await db.public.services.create({
		name: "Pet Sitting",
		priceType: "fixed",
		chargesText: "You will be charged. Serve-It will charge 10% as maintenance fee.",
		certificateRequired: true,
		price: 10,
		questions: [
			{
				id: 1,
				question: "Size of Pet",
				text: null,
				type: "mcq",
				options: { Medium: 0, Large: 0 },
			},
			{
				id: 2,
				question: "Type of Pet",
				text: null,
				type: "mcq",
				options: { Cat: 0, Dog: 0 },
			},
			{ id: 3, question: "Amount", text: "Number of Pets", type: "integer", price: 5 },

			{
				id: 4,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Full : Feeding, Watching, Bathing, Walking": 30,
					"Watching Only": 10,
					"Walking Only": 10,
					"Bathing Only": 10,
					"Watching & Feeding Only": 20,
					"Watching & Walking Only": 20,
				},
			},
		],
	});
	await db.public.services.create({
		name: "Moving In/Out",
		priceType: "fixed",
		chargesText: "You will be charged. Serve-It will charge 10% as maintenance fee.",
		certificateRequired: true,
		price: 0,
		questions: [
			{
				id: 1,
				question: "Options",
				text: null,
				type: "mcq",
				options: { Small: 10, medium: 20, large: 25 },
			},
			{ id: 2, question: "Trip", text: "Total trimp length (Miles)", type: "integer", price: 0 },
			{
				id: 3,
				question: "Options",
				text: null,
				type: "mmcq",
				options: {
					"Full service : All Furniture In": 20,
					"Full service : All Furniture Out": 25,
				},
			},
		],
	});
	provider = await db.public.provider_service.create({
		login_id: 1,
		service_id: 1,
	});
	user = await db.public.login.create({
		first_name: "Foo",
		middle_name: "Testing",
		last_name: "User",
		sex: 1,
		firebase_id: "2",
	});

	//   users.push(user.id);

	//   // Create a dummy account for insertions of data.

	//   // Also, here, insert the policies.
	//   let policy_inserted = null,
	//     transaction = await db.public.sequelize.transaction();
	//   let transaction_success = null;

	//   try {
	//     //
	//     for (let i of policies) {
	//       policy_inserted = await db.public.policy.create(i, {
	//         transaction: transaction,
	//       });
	//     }
	//     transaction_success = await transaction.commit();
	//   } catch (err) {
	//     transaction_success = await transaction.rollback();
	//   }

	//   console.log('the transaction success is:  ', transaction_success);
	return 0;
}

// async function atc_force() {
//   console.log('atc force running');
//   // insert a couple of strips. for both users.

//   let strip_obj = {
//       type: 'Strip_',
//       login_id: null,
//     },
//     strip_created,
//     strip_permissions,
//     strip_permissions_created,
//     index = 0;

//   for (let user of users) {
//     index = 0;

//     while (index < 4) {
//       strip_obj.type = 'Strip_' + index;
//       strip_obj.login_id = user;

//       strip_created = await db.atc.strips.create(strip_obj);

//       // Create strip.
//       strip_permissions = {
//         entity_name: 'atc.strips',
//         entity_id: strip_created.id,
//         status: new Date(),
//         role: 'r',
//         login_id: user,
//       };

//       // Now insert the permission.
//       strip_permissions_created = await db.public.permissions.create(strip_permissions);
//       strip_permissions.role = 'w';
//       strip_permissions_created = await db.public.permissions.create(strip_permissions);
//       index += 1;
//     }
//   }
//   return 0;
// }

async function main(testing) {
	const schema = ["sequelize", true, public_force];
	/* var schemas = [
          // SchemaName, force_param, force_function(to be executed in case, the force param is true)
          ['public', true, public_force],
          // ['atc', true, atc_force],
          // ['atc', true, atc_force]
      ], force_ret = 0; */
	if (!testing) console.log("Creating the tables");

	//
	if (!testing) console.log(schema);
	if (testing) db[schema[0]].sequelize.options.logging = false;
	let public_ret = await db[schema[0]].sequelize.sync({ force: true });

	if (!testing) console.log(`${schema[0]} created`);
	if (schema[1]) {
		let force_ret = await schema[2](testing);
		if (!testing) console.log(`${schema[0]} force param executed ${force_ret}`);
	}
	if (!testing) console.log("\n\n\n\n\n");
	return 0;
	// process.exit(0)
}

async function closeConn() {
	const schema = ["sequelize", true, public_force];
	await db[schema[0]].sequelize.close();
	return 0;
}

if (require.main === module) {
	let arg = process.argv[2];
	if (arg && arg === "startTest") {
		console.log("testmode");
		main(true)
			.then(() => closeConn())
			.then(() => {
				console.log("DB Restored");
				process.exit(0);
			});
	} else {
		main(false)
			.then(() => closeConn())
			.then(() => {
				process.exit(0);
			});
	}
}
