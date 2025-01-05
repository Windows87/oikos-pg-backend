import { Request, Response } from 'express'
import prisma from '../../db'

const addMeetingAttendanceVisitor = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { visitor_name, visitor_whatsapp } = req.body
  const meeting_id = req.params.id

  try {
    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userLeaderGroup)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    const meetingAttendance = await prisma.meeting_attendance.create({
      data: {
        visitor_name,
        visitor_whatsapp,
        meeting_id: Number(meeting_id),
        attendance_type: 'Visitante',
      },
    })

    return res.send(meetingAttendance)
  } catch (error: any) {
    console.error(`[ERROR] [Add Member] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao adicionar membro - Tente novamente mais tarde',
    })
  }
}

export { addMeetingAttendanceVisitor }
