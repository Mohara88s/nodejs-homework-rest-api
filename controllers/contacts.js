const {Contact} = require("../models")
const { NotFound, BadRequest } = require('http-errors')

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({}, "_id name email phone favorite")
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, "_id name email phone favorite")
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      result,
    },
  })
}

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

const updateContactFavorite = async (req, res, next) => {
  const { contactId } = req.params
  const {favorite} = req.body
  if (!favorite) {
    throw new BadRequest(`missing field favorite`)
  }
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new:true})
  
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateContactFavorite,
}
