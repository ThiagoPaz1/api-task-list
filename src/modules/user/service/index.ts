import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import { userRepository } from '../repository'
import { CreateUserDto, GetUserDto} from '../../../dto'

class UserService {
  public async create(param: CreateUserDto): Promise<void> {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(param.password, salt);
    const userData: CreateUserDto = {
      name: param.name,
      email: param.email,
      password: hash
    }

    return await userRepository.create(userData)
  }

  public async getUserByEmail(email: string): Promise<{user: GetUserDto, token: string}> {
    const user = await userRepository.getByEmail(email)
    const token = jwt.sign({email}, String(process.env.JWT_SECRET), {expiresIn: '24h'})

    return { user, token }
  }
}

export const userService = new UserService()