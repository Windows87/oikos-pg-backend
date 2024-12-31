import { Request, Response } from 'express'
import prisma from '../../db'

const getGroups = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req

  if (!user?.is_admin) return res.status(403).send({ title: 'Erro de Autorização', message: 'Usuário não autorizado' })

  try {
    const groups = await prisma.group.findMany({
      include: {
        group_leader: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })
    return res.send(groups)
  } catch (error: any) {
    console.error(`[ERROR] [Get Groups By Campus and Tags] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao obter grupos - Tente novamente mais tarde',
    })
  }
}

export { getGroups }
