const conn = require('./conn');
const Sequelize = require('sequelize');
const {STRING, TEXT, DECIMAL} = Sequelize;

//campus model
const Campuses = conn.define('campus', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'default-campus.jpg'
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT,
  }
});

module.exports = Campuses;
