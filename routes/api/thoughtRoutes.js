const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThoughts,
  } = require('../../controllers/thoughtController');

  router.route('/').get(getThoughts).post(createThoughts);
  router.route('/:thoughtsId').get(getSingleThought);

module.exports = router;
