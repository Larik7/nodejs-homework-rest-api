const { Contact } = require("../models/contact/contact");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createAt -updateAt", {skip, limit}).populate("owner");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({ message: "Delete success" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
