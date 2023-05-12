import { taskRepository } from '../repository'
import { CreateTaskDto, GetTaskDto } from '../../../dto'


class TaskService {
  public async create(param: CreateTaskDto): Promise<void> {
    await taskRepository.create(param)
  }

  public async getAllTasksWithPagination(
    userId: string,
    page: number,
    pageSize: number): Promise<{ tasks: GetTaskDto[], tasksTotal: number }> {
    const pageData = !page ? 0 : page
    const pageSizeData = !pageSize ? 10 : pageSize
    const allTasks = await taskRepository.getAllWithPagination(userId, pageData, pageSizeData)

    return allTasks
  }
}

export const taskService = new TaskService()