const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThoughts,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

  } = require('../../controllers/thoughtController');

  router.route('/').get(getThoughts).post(createThoughts);
  router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);
  router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;
