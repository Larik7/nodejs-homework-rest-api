const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': "missing required name field"
  }),
  email: Joi.string().email().required().messages({
    'any.required': "missing required name field",
    'any.invalid': 'invalid value'
  }),
  phone: Joi.string().required().messages({
    'any.required': "missing required name field"
  })
});

module.exports = {
    contactAddSchema,
}