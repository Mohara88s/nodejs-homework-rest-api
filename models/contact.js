const { Schema, model } = require('mongoose')
const Joi = require('joi')

const nameRegex = /^[a-zA-Z ]{3,35}$/
const phoneRegex = /^[0-9()-]{10,25}$/
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    match: nameRegex,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    match: emailRegex,
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
    minlength: 10,
    match: phoneRegex,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegex)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegex)
    .required(),
  favorite: Joi.boolean(),
})

module.exports = {
  Contact,
  joiSchema
}
