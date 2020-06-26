// This file is used to initialize db and make associations
const Sequelize = require('sequelize');

const db = {};

// The cache configuration
var Redis = require('ioredis');
db.cache = Redis;

db.Sequelize = Sequelize; // For easier querying.
// db.sequelize = sequelize; // Connections are handled in the individual db instances
db.Op = Sequelize.Op; // Very important
db.sequelize = require('../models/public/db');
db.public = require('./public/models');

// Define all relationships here, and not in the individual files
db.public.admin.belongsTo(db.public.login, { foreignKey: 'user_id', onDelete: 'CASCADE', constraints: false });
db.public.login.hasOne(db.public.admin, { foreignKey: 'login_id', onDelete: 'CASCADE', constraints: false });

module.exports = db;
