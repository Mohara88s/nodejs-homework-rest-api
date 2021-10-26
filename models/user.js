const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

const joiSchema = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string()
})

module.exports = {
  User,
  joiSchema,
}
