const conn = require('./conn')
const Campuses = require('./Campuses');
const Students = require('./Students');
const syncAndSeed = require('./syncAndSeed')

Campuses.hasMany(Students);
Students.belongsTo(Campuses);

module.exports = {
  conn,
  syncAndSeed,
  models: {
    Campuses,
    Students
  }
}
