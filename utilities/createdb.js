var db = require("../models/db");
var policies = require("./policies.initial");

// let users = [];

async function public_force(testing) {
	if (!testing) {
		console.log("Public force executed");
	}
	let user, service, user_community, community, provider;

	community = await db.public.community.create({
		name: "abc",
		description: "hello world",
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
		description: "Any Description Here",
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
