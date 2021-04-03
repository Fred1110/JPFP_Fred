const conn = require('./conn');
const Sequelize = require('sequelize');
const {STRING, TEXT, DECIMAL} = Sequelize;

//student model
const Students = conn.define('student', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'default-student.jpg'
  },
  gpa: {
    type: DECIMAL,
    validate: {
      max: 4.0,
      min: 0.0
    }
  }
});

module.exports = Students;
