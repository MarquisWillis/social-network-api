const router = require('express').Router();

// controller functions for users to be assigned to user routes
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// base route and controllers that can be performed on it
router.route('/').get(getUsers).post(createUser);

// userId specified router and controllers reliant on userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// route for adding and removing friends from specified user with userId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;