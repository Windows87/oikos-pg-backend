import express from 'express'
import controller from './member.controller'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/').all(auth).get(controller.getMembers)
router.route('/').all(auth).post(controller.addMember)
router.route('/:id').all(auth).delete(controller.removeMember)

export default router
