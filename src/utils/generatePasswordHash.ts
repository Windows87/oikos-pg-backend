import bcrypt from 'bcryptjs'

function generatePasswordHash(password: string): Promise<string> {
  return new Promise(async (next, reject) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10)
      next(passwordHash)
    } catch (error) {
      /* istanbul ignore next */
      reject(error)
    }
  })
}

export default generatePasswordHash
