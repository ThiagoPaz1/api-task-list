import { taskRepository } from '../repository'
import { CreateTaskDto, GetTaskDto } from '../../../dto'

import { dateFormat } from '../../../utils/dateFormat'

class TaskService {
  public async create(param: CreateTaskDto): Promise<void> {
    await taskRepository.create(param)
  }

  public async getAllTasksWithPagination(
    userId: string,
    page: number,
    pageSize: number): Promise<{
      tasks: GetTaskDto[],
      tasksTotal: number,
      totalPages: number
    }> {
    const pageData = !page ? 0 : page
    const pageSizeData = !pageSize ? 10 : pageSize
    const { tasksTotal, tasks, totalPages } = await taskRepository.getAllWithPagination(userId, pageData, pageSizeData)
    const tasksData: GetTaskDto[] = tasks.map(i => ({
      id: i.id,
      title: i.title,
      description: i.description,
      created_at: dateFormat(i.created_at)
    }))
    
    const allTasks = {
      tasksTotal,
      totalPages,
      tasks: tasksData
    }

    return allTasks
  }
}

export const taskService = new TaskService()