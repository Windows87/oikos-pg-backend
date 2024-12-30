import { Request, Response } from 'express'
import prisma from '../../db'

const createGroup = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user, body } = req

  if (!user?.is_admin)
    return res.status(401).send({ title: 'Não autorizado', message: 'Você não tem permissão para criar PGs' })

  try {
    const groupAlreadyExists = await prisma.group.findFirst({ where: { name: body.name } })

    if (groupAlreadyExists)
      return res.status(400).send({ title: 'PG já existe', message: 'Já existe um PG com esse nome' })

    const code = (Math.floor(Math.random() * 90000) + 10000).toString()
    const groupData = {
      name: body.name,
      code,
    }

    const group = await prisma.group.create({ data: groupData })

    res.send(group)
  } catch (error: any) {
    console.error(`[ERROR] [Create Group] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao criar grupo - Tente novamente mais tarde',
    })
  }
}

export { createGroup }
