const { Contact } = require("../models/contact");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  return res.status(200).json(result);
};
const getOnecontactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
const createNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  return res.status(201).json(result);
};
const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Missing fields");
  }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!Object.keys(body).length) {
    throw HttpError(400, "missing field favorite");
  }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json({ message: "contact deleted" });
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOnecontactById: ctrlWrapper(getOnecontactById),
  createNewContact: ctrlWrapper(createNewContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContactById: ctrlWrapper(deleteContactById),
};
