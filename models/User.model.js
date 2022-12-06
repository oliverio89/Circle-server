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
      default: 'hola mundo'

    },
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

