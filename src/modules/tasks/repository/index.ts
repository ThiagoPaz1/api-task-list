import { tasksDB } from '../../../database/tasksDB'
import { CreateTaskDto, GetTaskDto } from '../../../dto/task.dto'


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

  public async getAllWithPagination(
    userId: string,
    page: number,
    pageSize: number): Promise<{tasks: GetTaskDto[], tasksTotal: number}> {
    const path = `users/${userId}/tasks`
    const { query } = tasksDB.ref(path)
    const skipSize = page * pageSize
    const tasksTotal = await query().count()
    const { getValues } = await query()
      .skip(skipSize)
      .take(pageSize)
      .get()

    
    return { tasks: getValues(), tasksTotal: tasksTotal }
  }
}

export const taskRepository = new TaskRepository()