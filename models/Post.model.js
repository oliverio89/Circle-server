const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {

        title: {
            type: String,
            required: [true, 'El título es obligatorio.']
        },
        description: {
            type: String,
            required: [true, 'La descripción es obligatoria.'],
            minlength: [20, 'La descripción debe tener min. 20 caracteres']
        },
        imageUrl: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        imageOwner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        // createdPosts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'User',
        //     }
        // ],
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