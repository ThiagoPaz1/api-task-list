import { tasksDB } from '../../../database/tasksDB'
import { CreateUserDto, GetUserDto } from '../../../dto'


class UserRepository {
  public async create(param: CreateUserDto) {
    await tasksDB.ref('users').push({
      name: param.name,
      email: param.email,
      password: param.password
    })
  }

  public async getByEmail(email: string): Promise<GetUserDto> {
    const user =
      await tasksDB
        .ref('users')
        .query()
        .filter('email', '==', email)
        .take(1)
        .get()

    return user.getValues()[0]
  }
}

export const userRepository = new UserRepository()