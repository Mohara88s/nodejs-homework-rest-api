const express = require('express')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAllContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContactById))

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateContactById))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateContactFavorite))

module.exports = router
