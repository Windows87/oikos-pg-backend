import { Request, Response } from 'express'
import { getMembers } from './controllers/getMembers'
import { addMember } from './controllers/addMember'
import { removeMember } from './controllers/removeMember'

interface Controller {
  getMembers: (req: Request, res: Response) => void
  addMember: (req: Request, res: Response) => void
  removeMember: (req: Request, res: Response) => void
}

const controller: Controller = {
  getMembers,
  addMember,
  removeMember,
}

export default controller
