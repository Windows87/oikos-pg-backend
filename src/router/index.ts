import express from 'express'

import groupsRouter from '../group/group.router'
import usersRouter from '../user/user.router'
import mettingsRouter from '../meeting/meeting.router'
import membersRouter from '../members/member.router'
import meetingAttendancesRouter from '../meeting_attendance/meeting_attendance.router'

const router = express.Router()

router.use('/groups', groupsRouter)
router.use('/users', usersRouter)
router.use('/meetings', mettingsRouter)
router.use('/members', membersRouter)
router.use('/meeting-attendances', meetingAttendancesRouter)

export default router
