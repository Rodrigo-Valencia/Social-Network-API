const { User } = require('../models');

const userController = {
    // GET ALL USERS
    getAllUser(req, res) {
        User.find({ })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({ 
            path: 'friends', 
            select: '-__v',
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        });
    },

    // GET ONE USER BY ID
    getUserById({ params }, res) {
        User.findOne ({ _id: params.id })
        .populate ({ 
            path: 'thoughts',
            select: '-__v'
        })
        .populate ({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'NO USER FOUND' });
                return;
            }
            res.json(dbUserData)
        }).catch(err => {
            console.log(err)
            res.status(404).json(err)
        });
    },

    // NEW USER
    createUser ({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // 
    addFriends({ params }, res) {
        User.findOneAndUpdate ( 
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true }
        ).populate({ path: 'friends', select: ('-__v')})
         .select('-__v')
         .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'NO USER FOUND' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },

    // UPDATE SINGLE USER
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true }
        ).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'NO USER FOUND' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err))
    },

    // DELETE
    deleteUser ({ params }, res ) {
        User.findOneAndDelete ({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json ({ message: 'NO USER FOUND' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.status(404).json(err))
    },

    // DELETE SINGLE FRIEND
    deleteFriends({ params }, res) {
        User.findOneAndUpdate (
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { new: true }
        ).populate({ path: 'friends', select: '-__v' })
         .select('-__v')
         .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'NO USER FOUND' });
                return;
            }
            res.json(dbUserData)
        }).catch(err => res.status(400).json(err));
    }
};

module.exports = userController;