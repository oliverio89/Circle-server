const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(

  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [5, 'La contraseña debe tener mínimo 5 caracteres']
    },
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio']
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

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})
userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}
userSchema.methods.signToken = function () {
  const { _id, email, username, imageUrl, name, bio, role, friends } = this
  const payload = { _id, email, username, imageUrl, name, bio, role, friends }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}



const User = model("User", userSchema);

module.exports = User;

