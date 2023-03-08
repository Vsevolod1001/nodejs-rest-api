const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  schemaCreate,
  schemaFavorite,
  schemaPut,
} = require("../../models/contact");
const { validateRequest } = require("../../middlewares/validateRequest");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:id", auth, ctrlWrapper(ctrl.getById));
router.delete("/:id", auth, ctrlWrapper(ctrl.removeById));
router.post("/", auth, validateRequest(schemaCreate), ctrlWrapper(ctrl.create));
router.put(
  "/:id",
  auth,
  validateRequest(schemaPut),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  auth,
  validateRequest(schemaFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
