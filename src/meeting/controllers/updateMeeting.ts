import { Request, Response } from 'express'
import prisma from '../../db'

const updateMeeting = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user, body } = req
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
        name: body.name,
        date: body.date,
        theme: body.theme,
      },
    })

    if (body.contents) {
      await prisma.meeting_content.deleteMany({ where: { meeting_id: updatedMeeting.id } })
      for (const content of body.contents) {
        await prisma.meeting_content.create({
          data: {
            name: content.name,
            type: content.type,
            link: content.link,
            meeting_id: updatedMeeting.id,
          },
        })
      }
    }

    res.send(updatedMeeting)
  } catch (error: any) {
    console.error(`[ERROR] [Update Meeting] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao atualizar reunião - Tente novamente mais tarde',
    })
  }
}

export { updateMeeting }
