import express from 'express'

import groupsRouter from '../group/group.router'
import usersRouter from '../user/user.router'

const router = express.Router()

router.use('/groups', groupsRouter)
router.use('/users', usersRouter)

export default router
