import { Request, Response } from 'express'
import { createGroup } from './controllers/createGroup'
import { deleteGroup } from './controllers/deleteGroup'
import { getGroups } from './controllers/getGroups'

interface Controller {
  getGroups: (req: Request, res: Response) => void
  createGroup: (req: Request, res: Response) => void
  deleteGroup: (req: Request, res: Response) => void
}

const controller: Controller = {
  getGroups,
  createGroup,
  deleteGroup,
}

export default controller
