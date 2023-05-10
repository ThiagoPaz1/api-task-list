import { tasksDB } from '../../../database/tasksDB'
import { CreateUserDto } from '../../../dto'


class UserRepository {
  public async create(param: CreateUserDto) {
    await tasksDB.ref('users').push({
      name: param.name,
      email: param.email,
      password: param.password
    })
  }
}

export const userRepository = new UserRepository()