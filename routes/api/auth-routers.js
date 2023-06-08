const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/auth-controllers");
const { authenticate } = require("../../middlewares/authenticate");
const {schemas} = require("../../models/contact/user");
const {validateBody} = require("../../decorators");

// router.use(authenticate);

router.post("/register", validateBody(schemas.registerSchema), authControllers.register);
router.post("/login", validateBody(schemas.loginSchema), authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);

module.exports = router;