import { Request, Response } from 'express'
import prisma from '../../db'

const updateMeetingAttendance = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { attendance_type, absence_reason } = req.body
  const { id } = req.params

  try {
    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userLeaderGroup)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    await prisma.meeting_attendance.update({
      where: { id: Number(id) },
      data: { attendance_type, absence_reason },
    })

    return res.send({ sucessful: true })
  } catch (error: any) {
    console.error(`[ERROR] [Update Meeting Attendance] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao atualizar presença - Tente novamente mais tarde',
    })
  }
}

export { updateMeetingAttendance }
