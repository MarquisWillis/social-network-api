const { User } = require('../models');

module.exports = {
    // get all users GOOD
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // get one user by id GOOD 
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create new user GOOD
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                !user
                    ? res.status(404).json({
                        message: 'user creation error',
                    })
                    : res.json('Created the user 🎉')
            })
            .catch((err) => res.status(500).json(err));
    },

    // update user info by id GOOD
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'no user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // delete user by id GOOD
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((deletedUser) =>
                !deletedUser
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ message: 'User successfully removed' })
            )
            .catch((err) => res.status(500).json(err));
    },

    // add friend by id GOOD
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'no user with this id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    // remove friend by id GOOD
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then(user =>
                !user
                    ? res.status(404).json({ message: 'User not found' })
                    : res.json(user)    
            )
            .catch((err) => res.status(500).json(err));
    }
};