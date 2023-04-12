const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contactsSchemas");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getOnecontactById);
router.post("/", validateBody(schemas.addSchema), ctrl.createNewContact);

router.put(
  "/:contactId",
  validateBody(schemas.updateSchema),
  ctrl.updateContactById
);

router.delete("/:contactId", ctrl.deleteContactById);

module.exports = router;
