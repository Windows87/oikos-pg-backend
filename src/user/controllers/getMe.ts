import { Request, Response } from 'express'
import prisma from '../../db'

const getMe = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req

  try {
    const isLeader = !!(await prisma.group_leader.findFirst({ where: { user_id: user?.id } }))
    // @ts-ignore
    user.is_leader = isLeader
    res.send(user)
  } catch (error: any) {
    console.error(`[ERROR] [Get Me] Unexpected Error: ${error.message}`)
    return res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao buscar usuário - Tente novamente mais tarde',
    })
  }
}

export default getMe
