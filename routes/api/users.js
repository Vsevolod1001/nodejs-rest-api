const express = require("express");
const ctrl = require("../../controllers/getCurrent");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");
const { updateSubscription } = require("../../controllers/updateSubscription");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/", auth, ctrlWrapper(updateSubscription));

module.exports = router;
