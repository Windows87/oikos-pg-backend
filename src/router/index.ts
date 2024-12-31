import express from 'express'

import groupsRouter from '../group/group.router'
import usersRouter from '../user/user.router'
import mettingsRouter from '../meeting/meeting.router'

const router = express.Router()

router.use('/groups', groupsRouter)
router.use('/users', usersRouter)
router.use('/meetings', mettingsRouter)

export default router
