import express from 'express'
import controller from './meeting.controller'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/').all(auth).get(controller.getMeetings)
router.route('/').all(auth).post(controller.createMeeting)
router.route('/:id').all(auth).patch(controller.updateMeeting)
router.route('/:id/cancel').all(auth).post(controller.cancelMeeting)

export default router
