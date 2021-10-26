const express = require('express')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/signin', validation(joiSchema), controllerWrapper(ctrl.signin))

router.get('/signout', authenticate, controllerWrapper(ctrl.signout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/current', authenticate, controllerWrapper(ctrl.updateSubscription))

module.exports = router
