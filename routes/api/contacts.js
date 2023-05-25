const express = require('express');

const contactsController = require("../../controllers/contacts-controllers");

const schemas = require("../../schemas/contacts-schemas");

const {validateBody} = require("../../decorators")

const router = express.Router();

router.get('/', contactsController.listContacts);

router.get('/:id', contactsController.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete('/:id', contactsController.removeContact);

router.put('/:id', validateBody(schemas.contactAddSchema), contactsController.updateContact);

module.exports = router;