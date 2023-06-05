const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const schemas = require("../../schemas/contacts-schemas");

const { validateBody, isValidId } = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete("/:id", isValidId, contactsController.removeContact);

router.put("/:id", isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContact);

router.patch("/:id/favorite", isValidId, contactsController.updateStatusContact);

module.exports = router;
