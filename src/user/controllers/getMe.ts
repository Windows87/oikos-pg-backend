import { Request, Response } from 'express'

const getMe = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req
  res.send({ user })
}

export default getMe
