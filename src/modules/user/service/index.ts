import bcryptjs from 'bcryptjs'

import { userRepository } from '../repository'
import { CreateUserDto } from '../../../dto'

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
}

export const userService = new UserService()