const express = require("express");
const ctrl = require("../../controllers/getCurrent");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");
const { updateSubscription } = require("../../controllers/updateSubscription");
const upload = require("../../middlewares/upload");
const updateAvatar = require("../../controllers/updateAvatar");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/", auth, ctrlWrapper(updateSubscription));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
