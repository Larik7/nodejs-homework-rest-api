const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../../helpers");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", HandleMongooseError);

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
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactAddSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  schemas,
};