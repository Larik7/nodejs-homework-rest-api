const express = require("express");

const authControllers = require("../../controllers/auth-controllers");

const {schemas} = require("../../models/contact/user");

const {validateBody} = require("../../decorators");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), authControllers.register);
router.post("/login", validateBody(schemas.loginSchema), authControllers.login);

module.exports = router;