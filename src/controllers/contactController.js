const Contact = require("../models/contact");
const Joi = require("joi");

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().required(),
});

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Create a new contact
exports.createContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
