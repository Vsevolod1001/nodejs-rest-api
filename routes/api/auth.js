const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateRequest } = require("../../middlewares/validateRequest");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { schemaRegister, schemaLogin } = require("../../models/user");
const auth = require("../../middlewares/auth");
const { verifyEmail } = require("../../controllers/verifyEmail");

const router = express.Router();

router.post(
  "/register",
  validateRequest(schemaRegister),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validateRequest(schemaLogin), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

module.exports = router;
