import { Request, Response } from 'express'
import { getMeetings } from './controllers/getMeetings'
import { createMeeting } from './controllers/createMeeting'
import { updateMeeting } from './controllers/updateMeeting'
import { cancelMeeting } from './controllers/cancelMeeting'

interface Controller {
  getMeetings: (req: Request, res: Response) => void
  createMeeting: (req: Request, res: Response) => void
  updateMeeting: (req: Request, res: Response) => void
  cancelMeeting: (req: Request, res: Response) => void
}

const controller: Controller = {
  getMeetings,
  createMeeting,
  updateMeeting,
  cancelMeeting,
}

export default controller
