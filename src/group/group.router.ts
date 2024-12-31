import express from 'express'
import controller from './group.controller'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/').all(auth).get(controller.getGroups)
router.route('/').all(auth).post(controller.createGroup)
router.route('/:id').all(auth).delete(controller.deleteGroup)
router.route('/:id/leaders').all(auth).post(controller.addGroupLeader)
router.route('/:id/leaders/:user_id').all(auth).delete(controller.removeGroupLeader)

export default router
