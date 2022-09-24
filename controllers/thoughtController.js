const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts GOOD 
    getThoughts(req, res) {
        Thought.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // get one thought by id GOOD
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a thought GOOD
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { id: req.params.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
                !user
                    ? res.status(404).json({
                        message: 'thought created, but found no user with that ID',
                    })
                    : res.json('Created the thought 🎉')
            })
            .catch((err) => res.status(500).json(err));
    },

    // update a thought based on id GOOD
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete thought based on id GOOD
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((deletedThought) =>
                !deletedThought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    ),
            )
            .then((user) => {
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought deleted but no user with this id!' })
                    : res.json({ message: 'Thought successfully deleted!' })
            })
            .catch((err) => res.status(500).json(err));
    },

    // create a new reaction on thought based on its id GOOD
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete reaction from thought of specified reaction id GOOD
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};