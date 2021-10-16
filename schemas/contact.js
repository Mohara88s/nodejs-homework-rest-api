const Joi = require('joi')
const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[0-9()-]+$/)
    .required(),
})

module.exports = joiSchema
