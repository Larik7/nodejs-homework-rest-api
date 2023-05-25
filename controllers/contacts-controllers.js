const Joi = require("joi");

const contactsService = require("../models/contacts/contacts");

const { HttpError } = require("../../helpers");

const {ctrlWrapper} = require("../decorators");

const contactAddSchema = Joi.object({
    "name": Joi.string().required(),
    "email": Joi.string().required(),
    "phone": Joi.string().required()
})

const listContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result)
}

const getContactById = async (req, res, next) => { 
    try {
      const {id} = req.params;
      const result = await contactsService.getContactById(id);
      if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
      }
    res.json(result);
    } catch (error) {
        next(error);
    }
}

const addContact = async (req, res, next) => {
    try {
      const { error } = contactAddSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const result = await contactsService.addContact(req.body);
      res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const removeContact = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await contactsService.removeContact(id);
      if(!result) {
        throw HttpError(404, `Contact with ${id} not found`);
      }
      res.json({ message: "Delete success" });
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req, res, next) => {
    try {
      const { error } = contactAddSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message)
      }
      const {id} = req.params;
      const result = await contactsService.updateContact(id, req.body);
      if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
      }
    } catch (error) {
        next(error);
    }
  }

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById,
    addContact,
    removeContact,
    updateContact
}