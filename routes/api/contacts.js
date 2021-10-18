const express = require('express')
const router = express.Router()
const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAllContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContactById))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContactById))

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateContactFavorite))

module.exports = router
