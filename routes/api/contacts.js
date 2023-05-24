const express = require('express')

const Joi = require("joi");

const contactsService = require("../../models/contacts/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router()

const contactAddSchema = Joi.object({
    "name": Joi.string().required(),
    "email": Joi.string().required(),
    "phone": Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result)
  } catch (error) {
      next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
      // const error = new Error(`Contact with ${id} not found`);
      // error.status = 404;
      // throw error;
      // res.status(404).json({
      // message: `Contact with ${id} not found`
      // })
    }
  res.json(result);
  } catch (error) {
      next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
      next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
