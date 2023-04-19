const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getOnecontactById);
router.post("/", validateBody(schemas.addSchema), ctrl.createNewContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:contactId", isValidId, ctrl.deleteContactById);

module.exports = router;
