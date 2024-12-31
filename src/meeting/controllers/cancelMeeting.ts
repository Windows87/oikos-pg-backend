import { Request, Response } from 'express'
import prisma from '../../db'

const cancelMeeting = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { id } = req.params

  try {
    const meeting = await prisma.meeting.findUnique({ where: { id: Number(id) } })

    if (!meeting) return res.status(404).send({ title: 'Encontro não encontrado', message: 'Encontro não encontrado' })

    const userGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userGroup) return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })
    if (meeting.group_id !== userGroup.group_id)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder do PG do encontro' })

    const updatedMeeting = await prisma.meeting.update({
      where: { id: Number(id) },
      data: {
        canceled_at: new Date(),
      },
    })

    res.send(updatedMeeting)
  } catch (error: any) {
    console.error(`[ERROR] [Create Meeting] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao criar reunião - Tente novamente mais tarde',
    })
  }
}

export { cancelMeeting }
