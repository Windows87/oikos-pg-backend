import { Request, Response } from 'express'
import { createGroup } from './controllers/createGroup'
import { deleteGroup } from './controllers/deleteGroup'
import { getGroups } from './controllers/getGroups'
import { addGroupLeader } from './controllers/addGroupLeader'
import { removeGroupLeader } from './controllers/removeGroupLeader'

interface Controller {
  getGroups: (req: Request, res: Response) => void
  createGroup: (req: Request, res: Response) => void
  deleteGroup: (req: Request, res: Response) => void
  addGroupLeader: (req: Request, res: Response) => void
  removeGroupLeader: (req: Request, res: Response) => void
}

const controller: Controller = {
  getGroups,
  createGroup,
  deleteGroup,
  addGroupLeader,
  removeGroupLeader,
}

export default controller
