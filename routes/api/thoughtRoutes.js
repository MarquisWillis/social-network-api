const router = require('express').Router();

// controller functions for thoughts to be assigned to thought routes
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// base route and controllers that can be performed on it
router.route('/').get(getThoughts).post(createThought);

// thoughtId specified router and controllers reliant on thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// route for removing reactions from specified thought with thoughtId
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;