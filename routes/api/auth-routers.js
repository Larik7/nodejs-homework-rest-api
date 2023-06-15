const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/auth-controllers");
const { authenticate, upload } = require("../../middlewares");
const {schemas} = require("../../models/contact/user");
const {validateBody} = require("../../decorators");

router.post("/register", validateBody(schemas.registerSchema), authControllers.register);
router.get("/verify/:verificationToken", authControllers.verify);
router.post("/verify", validateBody(schemas.userEmailSchema), authControllers.resendVerify)
router.post("/login", validateBody(schemas.loginSchema), authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);
router.patch("/avatars", authenticate, upload.single("avatar"), authControllers.updateAvatar);

module.exports = router;