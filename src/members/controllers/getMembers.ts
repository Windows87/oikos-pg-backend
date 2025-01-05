import { Request, Response } from 'express'
import prisma from '../../db'

const getMembers = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req

  if (!user?.group_id)
    return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não está em um PG' })

  try {
    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userLeaderGroup)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    const members = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        whatsapp: true,
        birthday: true,
        attendance: {
          select: {
            id: true,
            attendance_type: true,
            meeting: { select: { id: true, name: true, date: true, group_id: true } },
          },
          where: { meeting: { group_id: userLeaderGroup.group_id, canceled_at: null } },
          orderBy: { meeting: { date: 'desc' } },
        },
      },
      where: { group_id: userLeaderGroup.group_id },
      orderBy: { name: 'asc' },
    })

    return res.send(members)
  } catch (error: any) {
    console.error(`[ERROR] [Get Members] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao obter membros - Tente novamente mais tarde',
    })
  }
}

export { getMembers }
