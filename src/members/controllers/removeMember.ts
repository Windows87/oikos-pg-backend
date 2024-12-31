import { Request, Response } from 'express'
import prisma from '../../db'

const removeMember = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { id } = req.params

  if (!user?.group_id)
    return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não está em um PG' })

  try {
    const userLeaderGroup = await prisma.group_leader.findFirst({ where: { user_id: user?.id } })

    if (!userLeaderGroup)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não é líder de PG' })

    const member = await prisma.user.findUnique({ where: { id: Number(id) } })

    if (member?.group_id !== userLeaderGroup.group_id)
      return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não pertence ao seu PG' })

    await prisma.user.update({
      where: { id: Number(id) },
      data: { group_id: null },
    })

    return res.send({ sucessful: true })
  } catch (error: any) {
    console.error(`[ERROR] [Remove Member] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao remover membro - Tente novamente mais tarde',
    })
  }
}

export { removeMember }
