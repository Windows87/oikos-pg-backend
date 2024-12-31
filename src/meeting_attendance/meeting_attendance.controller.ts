import { Request, Response } from 'express'
import { addMeetingAttendance } from './controllers/addMeetingAttendance'
import { updateMeetingAttendance } from './controllers/updateMeetingAttendance'
import { deleteMeetingAttendance } from './controllers/deleteMeetingAttendance'
import { addMeetingAttendanceVisitor } from './controllers/addMeetingAttendanceVisitor'

interface Controller {
  updateMeetingAttendance: (req: Request, res: Response) => void
  deleteMeetingAttendance: (req: Request, res: Response) => void
  addMeetingAttendance: (req: Request, res: Response) => void
  addMeetingAttendanceVisitor: (req: Request, res: Response) => void
}

const controller: Controller = {
  updateMeetingAttendance,
  deleteMeetingAttendance,
  addMeetingAttendance,
  addMeetingAttendanceVisitor,
}

export default controller
