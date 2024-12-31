import { Request, Response } from 'express'
import prisma from '../../db'

const addGroupLeader = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user, body } = req
  const { id } = req.params

  if (!user?.is_admin)
    return res.status(401).send({ title: 'Não autorizado', message: 'Você não tem permissão para criar PGs' })

  try {
    await prisma.group_leader.create({
      data: {
        group_id: Number(id),
        user_id: body.user_id,
      },
    })

    res.send({ succesful: true })
  } catch (error: any) {
    console.error(`[ERROR] [Add Group Leader] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao adicionar líder ao PG - Tente novamente mais tarde',
    })
  }
}

export { addGroupLeader }
