// EXPRESS
const router = require('express').Router();

// USER-CONTROLLER REQUIREMENTS
const { getAllUser, getUserById, createUser, addFriends, updateUser, deleteUser, deleteFriends } = require('../../controllers/user-controller');

// GET, POST
router.route('/').get(getAllUser).post(createUser);

// GET, PUT, DELETE
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// POST, DELETE
router.route('/:id/friends/:friendId').post(addFriends).delete(deleteFriends);

module.exports = router;