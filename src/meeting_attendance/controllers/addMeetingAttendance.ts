import { Request, Response } from 'express'
import prisma from '../../db'

const addMeetingAttendance = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { user_id } = req.body
  const meeting_id = req.params.id

  try {
    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userLeaderGroup)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    const isAlreadyMeetingAttendanceCreated = await prisma.meeting_attendance.findFirst({
      where: { user_id: user_id, meeting_id: Number(meeting_id) },
    })

    if (isAlreadyMeetingAttendanceCreated)
      return res.status(400).send({ title: 'Erro de Validação', message: 'Presença já foi criada' })

    const meetingAttendance = await prisma.meeting_attendance.create({
      data: {
        user_id: user_id,
        meeting_id: Number(meeting_id),
        attendance_type: 'Não Preenchido',
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

export { addMeetingAttendance }
