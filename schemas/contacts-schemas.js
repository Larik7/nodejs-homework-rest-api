const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string()
    .regex(/^[\p{L}\s]+$/u)
    .min(3)
    .max(30)
    .trim()
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/^[\d\-+\s()]+$/)
    .min(10)
    .max(15)
    .trim()
    .required(),
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactAddSchema,
};
