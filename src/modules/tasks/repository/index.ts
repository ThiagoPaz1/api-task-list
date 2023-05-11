import { tasksDB } from '../../../database/tasksDB'
import { CreateTaskDto } from '../../../dto/task.dto'


class TaskRepository {
  public async create(param: CreateTaskDto): Promise<void> {
    const path = `users/${param.userId}/$taskId`
    await tasksDB.ref(path).push({
      title: param.title,
      description: param.description
    })
  }
 
  public async getAll() {
    const tasks = await tasksDB.ref('tasks').get()
    return await tasks.val()
  }
}

export const taskRepository = new TaskRepository()