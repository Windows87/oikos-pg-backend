import express from 'express'
import controller from './user.controller'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/login').post(controller.login)
router.route('/register').post(controller.register)
router.route('/me').all(auth).get(controller.getMe)
router.route('/me/group').all(auth).post(controller.setUserGroup)

export default router
