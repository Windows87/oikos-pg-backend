import { Request, Response } from 'express'
import prisma from '../../db'

const getMeetings = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req

  if (!user?.group_id)
    return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não está em um PG' })

  try {
    let meetings = []

    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })
    if (userLeaderGroup) {
      meetings = await prisma.meeting.findMany({
        where: { group_id: userLeaderGroup.group_id },
        include: {
          content: true,
          attendance: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              attendance_type: true,
            },
          },
        },
        orderBy: { date: 'desc' },
      })
      return res.send(meetings)
    } else {
      meetings = await prisma.meeting.findMany({
        where: { group_id: user?.group_id! },
        include: { content: true },
        orderBy: { date: 'desc' },
      })
    }

    return res.send(meetings)
  } catch (error: any) {
    console.error(`[ERROR] [Get Meetings] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao obter reuniões - Tente novamente mais tarde',
    })
  }
}

export { getMeetings }
