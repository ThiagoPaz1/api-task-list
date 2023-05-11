import { taskRepository } from '../repository'
import { CreateTaskDto } from '../../../dto/task.dto'


class TaskService {
  public async create(param: CreateTaskDto): Promise<void> {
    await taskRepository.create(param)
  }
}

export const taskService = new TaskService()