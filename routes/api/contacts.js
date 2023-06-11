const express = require("express");
const contactsController = require("../../controllers/contacts-controllers");
const { schemas } = require("../../models/contact/contact");
const { validateBody, isValidId } = require("../../decorators");
const { authenticate } = require("../../middleware");
const router = express.Router();
router.use(authenticate);

router.get("/", contactsController.listContacts);
router.get("/:id", isValidId, contactsController.getContactById);
router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);
router.delete("/:id", isValidId, contactsController.removeContact);
router.put("/:id", isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContact);
router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), contactsController.updateStatusContact);

module.exports = router;
