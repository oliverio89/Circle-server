const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {

        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: [20, 'La descripción debe tener min. 20 caracteres']
        },
        imageUrl: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        likes: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }],
    },

    {
        timestamps: true
    }

);

const Post = model("Post", postSchema)

module.exports = Post