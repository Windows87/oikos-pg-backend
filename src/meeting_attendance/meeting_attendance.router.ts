import express from 'express'
import controller from './meeting_attendance.controller'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/:id').all(auth).patch(controller.updateMeetingAttendance)
router.route('/:id').all(auth).delete(controller.deleteMeetingAttendance)

export default router
