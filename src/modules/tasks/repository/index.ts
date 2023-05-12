import { tasksDB } from '../../../database/tasksDB'
import { CreateTaskDto, GetTaskDto } from '../../../dto/task.dto'
import { dateFormat } from '../../../utils/dateFormat'

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
    pageSize: number): Promise<{
      tasks: GetTaskDto[],
      tasksTotal: number,
      totalPages: number
    }> {
    const skipSize = page * pageSize
    const tasksTotal = await tasksDB
      .ref(`users/${userId}/tasks`)
      .query()
      .count()

    const tasks = await tasksDB
      .ref(`users/${userId}/tasks`)
      .query()
      .skip(skipSize)
      .take(pageSize)
      .get()

    const totalPages = (): number => {
      const pages = tasksTotal / pageSize
      const pagesStr = String(pages)
      const index = pagesStr.indexOf('.')

      if (pages < 1) {
        return 0
      }

      if (index) {
        const pagesNumber = Number(pagesStr.substring(0, index)) + 1
        return pagesNumber
      } else {
        return pages
      }
    }
    const allTasksData = tasks.getValues()

    return {
      tasksTotal: tasksTotal,
      totalPages: totalPages(),
      tasks: allTasksData
    }
  }

  public async filter(userId: string, title: string, date: string): Promise<GetTaskDto[]> {
    let filteredTasks: GetTaskDto[] = []
    const tasksData = await tasksDB
      .ref(`users/${userId}/tasks`)
      .query()
      .get()
      const tasks: GetTaskDto[] = [...tasksData.getValues()] as GetTaskDto[]
      
      if (title && !date) {
        filteredTasks = tasks.filter((el, i) => tasks[i].title.toLowerCase().includes(title))

        return filteredTasks
    }

    if (!title?.length && date?.length) {
      filteredTasks = tasks.filter(i => dateFormat(i.created_at) === date)

      return filteredTasks
    }

    if (title && date) {
      filteredTasks =
        tasks
          .filter((_el, i) => tasks[i].title.toLowerCase().includes(title))
          .filter(i => dateFormat(i.created_at) === date)

      return filteredTasks
    }

    return filteredTasks
  }
}

export const taskRepository = new TaskRepository()