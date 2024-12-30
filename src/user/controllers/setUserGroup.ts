import { Request, Response } from 'express'
import prisma from '../../db'

const setUserGroup = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  const { group_code } = req.body

  if (!group_code)
    return res.status(400).send({ title: 'Código do PG não fornecido', message: 'Forneça um código de PG' })

  try {
    const group = await prisma.group.findFirst({ where: { code: group_code } })

    if (!group) {
      return res.status(404).send({ title: 'PG não encontrado', message: 'O código não pertence a nenhum PG' })
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(user?.id) },
      data: { group_id: group.id },
    })
    res.send(updatedUser)
  } catch (error: any) {
    console.error(`[ERROR] [Update User] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao atualizar usuário - Tente novamente mais tarde',
    })
  }
}

export default setUserGroup
