import { Request, Response } from 'express'
import prisma from '../../db'

const removeGroupLeader = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { id, user_id } = req.params

  if (!user?.is_admin)
    return res.status(401).send({ title: 'Não autorizado', message: 'Você não tem permissão para criar PGs' })

  try {
    await prisma.group_leader.deleteMany({
      where: {
        group_id: Number(id),
        user_id: Number(user_id),
      },
    })

    res.send({ succesful: true })
  } catch (error: any) {
    console.error(`[ERROR] [Remove Group Leader] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao remover líder do PG - Tente novamente mais tarde',
    })
  }
}

export { removeGroupLeader }
