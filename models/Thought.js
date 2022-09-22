const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');

// new schema for thuoght, which includes:
/*
    - thoughtText,
    - createdAt (set default to time when created)
    - thoughts (other model)
    - friends (self referenced model)
*/
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                ref: [reactionSchema],
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

thoughtSchema
    .virtual("reactionCount")
    .get(function () {
        return `Number of reactions: ${this.reactions.length}`;
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;