const router = require('express').Router();

const { getAllThoughts, getThoughtsById, createThoughts, addReaction, updateThoughts, deleteThought, removeReaction } = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts).post(createThoughts)

router.route('/:id').get(getAllThoughts).post(createThoughts)

router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/:reactionId').delete(removeReaction)

module.exports = router;