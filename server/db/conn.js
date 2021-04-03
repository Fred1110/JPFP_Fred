//data models
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/jpfp_campus_db');

module.exports = conn;
