var db = require("../models/db");
var policies = require("./policies.initial");

// let users = [];

async function public_force(){
    console.log("Public force executed");
    var user;

    // Adding the permissions for the site admin
    var user = await db.public.login.create({
        name: "Master",
        sex: 1
    });
    /* var permission_insert = await db.public.permissions.create({
        entity_name: '*',
        entity_id: 0,
        status: new Date(),
        role: "*",
        login_id: user.id
    }); */

    // users.push(user.id);

    user = await db.public.login.create({
        name: "Foo",
        sex: 1
    });

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNC0wMVQxMjo1ODozMy40NjFaIiwiaWF0IjoxNTg1NzQ2MjAxfQ.T4y7ZdgybRiKdDcIBUid0brrPEaMvhPbZVWmGzc9kWM
    user = await db.public.login.create({
        name: 'Sarvesh Shinde',
        email: 'f20180778@goa.bits-pilani.ac.in'
    });

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNC0wMVQxMjo1ODozMy40NjRaIiwiaWF0IjoxNTg1NzQ2MjAxfQ.KG5T1hpPXPX0BjCiv8BN1_W4nWIutFvJ_-y4ElVxRBY
    user = await db.public.login.create({
        name: 'Sarvesh Sandeep Shinde',
        email: 'SarveshShinde64@gmail.com'
    })

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNC0wMVQxMjo1ODozMy40NjZaIiwicm9sZSI6MCwib3JnYW5pemF0aW9uIjowLCJpYXQiOjE1ODU3NDYyMDF9.HzTlIWUJK0w4dOe2gAIqTjMecAKNDsdTVpCJffXTTtM
    admin = await db.public.admin.create({
        role: 0,
        organization: 0,
        user_id: 3,
        login_id: 3
    })

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNC0wMVQxMjo1ODozMy40NjlaIiwicm9sZSI6MSwib3JnYW5pemF0aW9uIjoxLCJpYXQiOjE1ODU3NDYyMDF9.iTwXqeZbw_x_zDMarpB91QTo3lVsDuYed_W5PYfovOo
    admin = await db.public.admin.create({
        role: 1,
        organization: 1, // Devsoc
        user_id: 4,
        login_id: 4
    })

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNC0wMVQxNjoxMjozNy42MDVaIiwicm9sZSI6Miwib3JnYW5pemF0aW9uIjpudWxsLCJpYXQiOjE1ODU3NTc2MDh9.yiWvT6bzBafAnuTPgO-3yAkH1vL1NeMIZgxprzXtdKU
    admin = await db.public.admin.create({
        role: 2,
        user_id: 2,
        login_id: 2
    })
    
    console.log("PrDrive force executed");
    var event, subEvent;

    event = await db.public.pr.event.create({
        name: 'FirstEvent',
        description: 'First Event',
        timeframe: 'test1'
    });

    event = await db.public.pr.event.create({
        name: 'SecondEvent',
        description: 'Second Event',
        timeframe: 'test2'
    });

    // users.push(user.id);


    // // Create a dummy account for insertions of data.

    // // Also, here, insert the policies.
    // let policy_inserted =  null,
    //     transaction = await db.public.sequelize.transaction();
    // let transaction_success = null;

    // try{
    //     //
    //     for(let i of policies){
    //         policy_inserted = await db.public.policy.create(i, {
    //             transaction: transaction
    //         });
    //     }
    //     transaction_success = await transaction.commit();
    // } catch(err){
    //     transaction_success = await transaction.rollback()
    // }

    // console.log("the transaction success is:  ", transaction_success);
    return 0;
}

/* async function atc_force(){
    console.log('atc force running');
    // insert a couple of strips. for both users.

    let strip_obj = {
        type: 'Strip_',
        login_id: null
    }, strip_created, strip_permissions, strip_permissions_created, index = 0;

    for(let user of users){

        index = 0;

        while(index < 4){

            strip_obj.type = 'Strip_' + index;
            strip_obj.login_id = user; 

            strip_created = await db.atc.strips.create(strip_obj);

            // Create strip.
            strip_permissions = {
                entity_name: 'atc.strips',
                entity_id: strip_created.id,
                status: new Date(),
                role: "r",
                login_id: user
            };

            // Now insert the permission.
            strip_permissions_created = await db.public.permissions.create(strip_permissions);
            strip_permissions.role = 'w';
            strip_permissions_created = await db.public.permissions.create(strip_permissions);
            index += 1;  
        }
    }
    return 0;
} */

async function main(){

    var schema = ['sequelize', true, public_force];
    /* var schemas = [
        // SchemaName, force_param, force_function(to be executed in case, the force param is true)
        ['public', true, public_force],
        // ['atc', true, atc_force],
        // ['atc', true, atc_force]
    ], force_ret = 0; */
    console.log("Creating the tables");

    //
    console.log(schema);
    public_ret = await db[schema[0]].sequelize.sync({ force: schema[1] });

    console.log( schema[0] +  " created");
    if(schema[1]){
        force_ret = await schema[2]();
        console.log(schema[0] + " force param executed " + force_ret);
    }
    console.log("\n\n\n\n\n");
    process.exit()
}

if(require.main == module){
    main();
}
