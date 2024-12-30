import { Request, Response } from 'express'
import getMe from './controllers/getMe'
import { register } from './controllers/register'
import { login } from './controllers/login'
import setUserGroup from './controllers/setUserGroup'

interface Controller {
  login: (req: Request, res: Response) => void
  register: (req: Request, res: Response) => void
  getMe: (req: Request, res: Response) => void
  setUserGroup: (req: Request, res: Response) => void
}

const controller: Controller = {
  login,
  register,
  getMe,
  setUserGroup,
}

export default controller
