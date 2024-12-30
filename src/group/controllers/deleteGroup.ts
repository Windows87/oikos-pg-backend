import { Request, Response } from 'express'
import prisma from '../../db'

const deleteGroup = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { id } = req.params

  if (!user?.is_admin)
    return res.status(401).send({ title: 'Não autorizado', message: 'Você não tem permissão para deletar PGs' })

  try {
    await prisma.group.delete({ where: { id: Number(id) } })
    res.send({ successful: true })
  } catch (error: any) {
    console.error(`[ERROR] [Group Delete] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao deletar grupo - Tente novamente mais tarde',
    })
  }
}

export { deleteGroup }
