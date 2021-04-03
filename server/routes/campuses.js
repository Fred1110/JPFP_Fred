const router = require('express').Router();
const Campuses = require('../db/Campuses')


//campus router
//get all campuses
router.get('/', async(req, res, next) => {
  try {
    const campuses = await Campuses.findAll();
    res.send(campuses)
  } catch (error) {
    next(error)
  }
});

//get campuses/:id
router.get('/:id', async(req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    res.send(campus);
  } catch (error) {
    next(error)
  }
});

//create campus
router.post('/', async(req, res, next) => {
  try {
    const campus = await Campuses.create(req.body);
    res.status(201).send(campus);
  } catch (error) {
    next(error)
  }
});

//update campus
router.put('/:id', async(req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    res.send(await campus.update(req.body))
  } catch (error) {
    next(error)
  }
});

//delete campus
router.delete('/:id', async(req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
