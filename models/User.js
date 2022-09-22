const { Schema, model } = require('mongoose');

// new schema for user, which includes:
/*
    - username,
    - email (with regex validator)
    - thoughts (other model)
    - friends (self referenced model)
*/
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            $regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual method to return the number of friends the user has
userSchema
    .virtual("friendCount")
    .get(function () {
        return `Number of friends: ${this.friends.length}`;
    });

const User = model('user', userSchema);

module.exports = User;