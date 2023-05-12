import { tasksDB } from '../../../database/tasksDB'
import { CreateTaskDto } from '../../../dto/task.dto'


class TaskRepository {
  public async create(param: CreateTaskDto): Promise<void> {
    const path = `users/${param.userId}/tasks`
    const newTask = await tasksDB.ref(path).push({
      title: param.title,
      description: param.description,
      created_at: new Date()
    })

    await tasksDB.ref(`${path}/${newTask.key}`).update({
      id: newTask.key
    })
  }
 
  public async getAll() {
    const tasks = await tasksDB.ref('tasks').get()
    return await tasks.val()
  }
}

export const taskRepository = new TaskRepository()