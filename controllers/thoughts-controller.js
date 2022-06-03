const { Thoughts, User } = require('../models');

const thoughtsController = {
    // NEW THOUGHT
    createThoughts({ params, body }, res ) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: {thoughts: _id }},
                { new: true }
            );
        }).then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'NO THOUGHTS FOUND' });
                return;
            }
            res.json(dbThoughtsData);
        }).catch(err => res.json(err));
    },

    // GETALL THOUGHTS
    getAllThoughts (req, res) {
        Thoughts.find({ })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        });
    },

    // GET BY ID
    getThoughtsById ({ params }, res ) {
        Thoughts.findOne ({ _id: params.id })
        .populate ({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'NO THOUGHTS FOUND' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
    },

    // NEW REACTION
    addReaction ({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        ).populate({ path: 'reactions', select: '-__v' })
         .select('-__v')
         .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'NO THOUGHT FOUND' });
                return;
            }
            res.json(dbThoughtsData)
        }).catch(err => res.json(err));
    },

    // DELECT REACTION
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactionsId: params.reactionsId }}},
            { new: true }
        ).then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'NO THOUGHT FOUND' });
                return;
            }
            res.json(dbThoughtsData);
        }).catch(err => res.status(400).json(err));
    },

    // UPDATE BY ID
    updateThoughts ({ params, body }, res) {
        Thoughts.findOneAndUpdate (
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        ).populate({ path: 'reactions', select: '-__v' })
         .select('-__v')
         .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'NO THOUGHT FOUND'});
                return;
            }
            res.json(dbThoughtsData);
        }).catch(err => res.json(err));
    },

    // DELETE BY ID
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete ({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'NO THOUGHTS FOUND' });
                return;
            }
            res.json(dbThoughtsData);
        }).catch(err => res.status(400).json(err));
    },
};

module.exports = thoughtsController;