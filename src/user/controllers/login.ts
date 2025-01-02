import { Request, Response } from 'express'
import prisma from '../../db'
import generatePasswordHash from '../../utils/generatePasswordHash'
import createToken from '../../utils/createToken'
import isUserPasswordCorrect from '../../utils/isUserPasswordCorrect'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).send({ title: 'Campos obrigatórios', message: 'Preencha todos os campos' })

  try {
    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) return res.status(400).send({ title: 'Usuário não encontrado', message: 'Email ou senha incorretos' })

    const isPasswordIncorrect = !(await isUserPasswordCorrect(password, user.password))

    if (isPasswordIncorrect)
      return res.status(400).send({ title: 'Senha incorreta', message: 'Email ou senha incorretos' })

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

export { login }
