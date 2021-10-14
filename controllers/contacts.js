const contactsOps = require("../model/contacts");
const { NotFound, BadRequest } = require("http-errors");


const getAllContacts = async (req, res, next) => {
	const contacts = await contactsOps.listContacts();
	res.json(contacts);
};

const getContactById = async (req, res, next) => {
	const { contactId } = req.params;
	const contact = await contactsOps.getContactById(contactId);
	if (!contact) {
		throw new NotFound(`Contact with id=${contactId} not found`);
	}
};

const addContact = async (req, res, next) => {
	const result = await contactsOps.addContact(req.body);
	res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await contactsOps.removeContact(contactId);
	if (!result) {
		throw new NotFound(`Contact with id=${contactId} not found`);
	}
	res.json({
		status: "success",
		code: 200,
		message: "contact deleted",
	});
};

const updateContact = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await contactsOps.updateContact(contactId, req.body);
	if (!result) {
		throw new NotFound(`Contact with id=${contactId} not found`);
	}
	res.json(result);
};

module.exports = {
	getAllContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
};
