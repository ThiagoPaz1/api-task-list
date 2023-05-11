import bcryptjs from 'bcryptjs'

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

  public async getUserByEmail(email: string): Promise<GetUserDto> {
    const user = await userRepository.getByEmail(email)
  
    return user
  }
}

export const userService = new UserService()