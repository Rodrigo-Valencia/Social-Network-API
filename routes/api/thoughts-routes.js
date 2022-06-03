// EXPRESS
const router = require('express').Router();

// THOUGHT-CONTROLLER REQUIREMENTS
const { getAllThoughts, getThoughtsById, createThoughts, addReaction, updateThoughts, deleteThoughts, deleteReaction } = require('../../controllers/thoughts-controller');

// GET
router.route('/').get(getAllThoughts);

// GET, PUT, DELETE
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

// POST
router.route('/:userId').post(createThoughts);

// POST
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;