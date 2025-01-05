import { Request, Response } from 'express'
import prisma from '../../db'

const addMember = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { whatsapp } = req.body

  if (!user?.group_id)
    return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não está em um PG' })

  try {
    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userLeaderGroup)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    const member = await prisma.user.findUnique({ where: { whatsapp } })

    if (!member) return res.status(404).send({ title: 'Usuário não encontrado', message: 'Usuário não encontrado' })

    await prisma.user.update({
      where: { whatsapp },
      data: { group_id: userLeaderGroup.group_id },
    })

    return res.send({ sucessful: true })
  } catch (error: any) {
    console.error(`[ERROR] [Add Member] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao adicionar membro - Tente novamente mais tarde',
    })
  }
}

export { addMember }
