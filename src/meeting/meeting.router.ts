import express from 'express'
import controller from './meeting.controller'
import meetingAttendanceController from '../meeting_attendance/meeting_attendance.controller'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/').all(auth).get(controller.getMeetings)
router.route('/').all(auth).post(controller.createMeeting)
router.route('/:id').all(auth).patch(controller.updateMeeting)
router.route('/:id/cancel').all(auth).post(controller.cancelMeeting)

router.route('/:id/members').all(auth).post(meetingAttendanceController.addMeetingAttendance)
router.route('/:id/visitors').all(auth).post(meetingAttendanceController.addMeetingAttendanceVisitor)

export default router
