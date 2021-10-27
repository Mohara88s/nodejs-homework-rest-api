const express = require('express')
const { controllerWrapper, authenticate, upload, resizing } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/current', authenticate, controllerWrapper(ctrl.updateSubscription))

router.patch('/avatars', authenticate, upload.single('avatar'), resizing, controllerWrapper(ctrl.updateAvatar))

module.exports = router
