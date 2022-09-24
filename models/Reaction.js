const { Schema, Types } = require('mongoose');

// subdocument required for thought responses. includes:
/*
    - reaction id to be created
    - reactionBody
    - username of user who created the reaction
    - createdAt (defaults to current time at creation)
 */
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

module.exports = reactionSchema;