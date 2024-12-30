import bcrypt from 'bcryptjs'
import { user } from '@prisma/client'

function isUserPasswordCorrect(rawPassword: string, userPassword: string) {
  return new Promise(async (next, reject) => {
    try {
      const result = await bcrypt.compare(rawPassword, userPassword)
      next(result)
    } catch (error) {
      /* istanbul ignore next */
      reject(error)
    }
  })
}

export default isUserPasswordCorrect
