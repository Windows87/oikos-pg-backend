import { Request, Response } from 'express'
import prisma from '../../db'

interface CreateMeetingBody {
  name: string
  date: string
  theme: string
  contents: {
    name: string
    type: string
    link: string
  }[]
}

const createMeeting = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const body: CreateMeetingBody = req.body

  try {
    const userGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userGroup) return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    const meeting = await prisma.meeting.create({
      data: {
        name: body.name,
        date: new Date(body.date),
        theme: body.theme,
        group_id: userGroup.group_id,
      },
    })

    for (const content of body.contents) {
      await prisma.meeting_content.create({
        data: {
          name: content.name,
          type: content.type,
          link: content.link,
          meeting_id: meeting.id,
        },
      })
    }

    const groupMembers = await prisma.user.findMany({
      where: { group_id: userGroup.group_id },
    })

    for (const member of groupMembers) {
      await prisma.meeting_attendance.create({
        data: {
          meeting_id: meeting.id,
          user_id: member.id,
          attendance_type: 'Não Preenchido',
        },
      })
    }

    res.send(meeting)
  } catch (error: any) {
    console.error(`[ERROR] [Create Meeting] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao criar reunião - Tente novamente mais tarde',
    })
  }
}

export { createMeeting }
