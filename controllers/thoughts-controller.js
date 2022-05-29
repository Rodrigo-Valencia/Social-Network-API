const { Thoughts, User } = require('../models');

const thoughtsController = {
    getAllThoughts (req, res) {
        Thoughts.find({ })
        .populate({ path: 'user', select: '-__v' })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        });
    },

    getThoughtsById ({ params }, res ) {
        Thoughts.findOne ({ _id: params.id })
        .populate ({ path: 'user', select: '-__v' })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        });
    },

    createThoughts({ params, body }, res ) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: {thoughts: _id }},
                { new: true }
            );
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'NO USER FOUND' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },

    addReaction ({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        ).then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'NO THOUGHT FOUND' });
                return;
            }
            res.json(dbThoughtsData)
        }).catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactionsId: params.reactionsId }}},
            { new: true }
        ).then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err));
    },

    updateThoughts ({ params, body }, res) {
        Thoughts.findOneAndUpdate (
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        ).then(updatedThoughts => {
            if (!updatedThoughts) {
                return res.status(404).json({ message: 'NO THOUGHT FOUND'});
            }
            res.json(updatedThoughts);
        }).catch(err => res.json(err));
    },

    deleteThought({ params, body}, res) {
        Thoughts.findOneAndDelete ({ _id: params.id })
        .then(deletedThoughts => {
            if (!deletedThoughts) {
                return res.status(404).json({ message: 'NO THOUGHTS FOUND' })
            }
            res.json(deletedThoughts);
        }).catch(err => res.json(err));
    }
};

module.exports = thoughtsController;