// This file is used to initialize db and make associations
const Sequelize = require("sequelize");

const db = {};

// The cache configuration
var Redis = require("ioredis");
const community = require("./public/community");
db.cache = Redis;

db.Sequelize = Sequelize; // For easier querying.
// db.sequelize = sequelize; // Connections are handled in the individual db instances
db.Op = Sequelize.Op; // Very important
db.sequelize = require("../models/public/db");
// db.public = require('./public/models');

db.public = require("./public/db");
// db.atc = require("./atc/db");

// Define all relationships here, and not in the individual files

// Permissions
// db.atc.strips.belongsTo(db.public.login, { onDelete: 'CASCADE' });
/// In case of RBAC
// db.public.permissions.belongsTo(db.public.login, { onDelete: 'CASCADE' });
// db.public.permissions.belongsTo(db.public.login, { onDelete: 'CASCADE', as: 'created_by' });
// db.public.permissions.belongsTo(db.public.policy, { onDelete: 'CASCADE' });

// db.public.provider.belongsTo(db.public.login, { foreignKey: "login_id", onDelete: "CASCADE" });
// db.public.login.hasOne(db.public.provider, { foreignKey: "login_id", onDelete: "CASCADE" });
// db.public.services.hasMany(db.public.provider, { onDelete: "CASCADE" });
// db.public.provider.belongsToMany(db.public.services, { onDelete: "CASCADE" });
db.public.login.belongsToMany(db.public.services, {
	through: db.public.provider_service,
	foreignKey: "login_id",
	onDelete: "CASCADE",
});
db.public.provider_service.belongsTo(db.public.login, { foreignKey: "login_id" });
db.public.services.belongsToMany(db.public.login, {
	through: db.public.provider_service,
	foreignKey: "service_id",
	onDelete: "CASCADE",
});

db.public.request.belongsTo(db.public.login, { as: "reciever", foreignKey: "reciever_id", onDelete: "CASCADE" });
db.public.login.hasMany(db.public.request, { foreignKey: "reciever_id", onDelete: "CASCADE" });

db.public.request.belongsTo(db.public.provider_service, { foreignKey: "provider_service_id", onDelete: "CASCADE" });
db.public.provider_service.hasMany(db.public.request, { foreignKey: "provider_service_id", onDelete: "CASCADE" });

db.public.request.belongsTo(db.public.services, { foreignKey: "service_id", onDelete: "CASCADE" });
db.public.services.hasMany(db.public.request, { foreignKey: "service_id", onDelete: "CASCADE" });

db.public.community.belongsToMany(db.public.login, {
	through: db.public.user_community,
	foreignKey: "community_id",
	onDelete: "CASCADE",
});
db.public.login.belongsToMany(db.public.community, {
	through: db.public.user_community,
	foreignKey: "login_id",
	onDelete: "CASCADE",
});

module.exports = db;
