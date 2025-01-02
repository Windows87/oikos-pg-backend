import { Request, Response } from 'express'
import prisma from '../../db'
import generatePasswordHash from '../../utils/generatePasswordHash'
import createToken from '../../utils/createToken'

const register = async (req: Request, res: Response) => {
  const { name, email, password, whatsapp, birthday } = req.body

  if (!name || !email || !password || !whatsapp || !birthday)
    return res.status(400).send({ title: 'Campos obrigatórios', message: 'Preencha todos os campos' })

  try {
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

    if (userWithSameEmail)
      return res.status(400).send({ title: 'Email já cadastrado', message: 'Este email já está cadastrado' })

    const passwordHash = await generatePasswordHash(password)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        whatsapp,
        birthday,
      },
    })

    const token = createToken(user.id, user.secure_pin)

    res.send({ token })
  } catch (error: any) {
    console.error(`[ERROR] [Register User] Unexpected Error: ${error.message}`)
    res.status(500).send({
      title: 'Erro inesperado',
      message: 'Erro inesperado ao registrar usuário - Tente novamente mais tarde',
    })
  }
}

export { register }
