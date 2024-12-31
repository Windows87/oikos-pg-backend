import express from 'express'

import groupsRouter from '../group/group.router'
import usersRouter from '../user/user.router'
import mettingsRouter from '../meeting/meeting.router'
import membersRouter from '../members/member.router'

const router = express.Router()

router.use('/groups', groupsRouter)
router.use('/users', usersRouter)
router.use('/meetings', mettingsRouter)
router.use('/members', membersRouter)

export default router
