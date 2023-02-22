const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  schemaCreate,
  schemaFavorite,
  schemaPut,
} = require("../../models/contact");
const { validateRequest } = require("../../middlewares/validateRequest");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.delete("/:id", ctrlWrapper(ctrl.removeById));
router.post("/", validateRequest(schemaCreate), ctrlWrapper(ctrl.create));
router.put("/:id", validateRequest(schemaPut), ctrlWrapper(ctrl.updateById));
router.patch(
  "/:id/favorite",
  validateRequest(schemaFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
