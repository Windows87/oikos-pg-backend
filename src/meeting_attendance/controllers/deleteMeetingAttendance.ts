import { Request, Response } from 'express'
import prisma from '../../db'

const deleteMeetingAttendance = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { id } = req.params

  try {
    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userLeaderGroup)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    await prisma.meeting_attendance.delete({
      where: { id: Number(id) },
    })

    return res.send({ sucessful: true })
  } catch (error: any) {
    console.error(`[ERROR] [Delete Meeting Attendance] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao deletar presença - Tente novamente mais tarde',
    })
  }
}

export { deleteMeetingAttendance }
