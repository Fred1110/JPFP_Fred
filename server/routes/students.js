const router = require('express').Router();
const Students = require('../db/Students');
const Campuses = require('../db/Campuses');

Campuses.hasMany(Students);
Students.belongsTo(Campuses);
//student router
//get all students
router.get('/', async(req, res, next) => {
  try {
    const students = await Students.findAll({
      include: [Campuses]
    });
    res.send(students);
  } catch (error) {
    next(error)
  }
});

//students/:id
router.get('/:id', async(req, res,next) => {
  try {
    const student = await Students.findByPk(req.params.id);
    res.send(student);
  } catch (error) {
    next(error)
  }
});

//create student
router.post('/', async(req, res, next) => {
  try {
    const student = await Students.create(req.body);
    res.status(201).send(student)
  } catch (error) {
    next(error)
  }
});

//update student
router.put('/:id', async(req, res, next) => {
  try {
    const student = await Students.findByPk(req.params.id);
    res.send(await student.update(req.body))
  } catch (error) {
    next(error)
  }
});

//delete student
router.delete('/:id', async(req, res, next) => {
  try {
    const student = await Students.findByPk(req.params.id);
    res.status(204).send(await student.destroy())
  } catch (error) {
    next(error)
  }
});

module.exports = router;
