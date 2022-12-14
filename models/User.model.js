const { Schema, model } = require("mongoose");

const userSchema = new Schema(

  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: "https://res.cloudinary.com/dtcpa2jtc/image/upload/v1671041357/imagen_por_defecto_xwpnsv.webp"

    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    createdPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      }
    ],
    // favPosts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Post',
    //   }
    // ],
    bio: {
      type: String
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'VERIFY'],
      default: 'USER'
    },
  },

  {
    timestamps: true
  }

);

const User = model("User", userSchema);

module.exports = User;

