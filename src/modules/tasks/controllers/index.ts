import { Request, Response } from 'express'

import { taskService } from '../services'
import { RequestData } from '../../../@types'

class TaskController {
  public async newTask(req: RequestData, res: Response): Promise<Response> {
    const { title, description } = req.body
    const userId = req.userId as string

    try {
      const taskData = {
        title,
        description,
        userId
      }

      await taskService.create(taskData)
      return res.status(201).json({message: 'Successfully created task'})
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  public async getAllTasks(req: RequestData, res: Response): Promise<Response> {
    const page = Number(req.query?.page)
    const pageSize = Number(req.query?.pageSize)
    const userId = String(req.userId)

    try {
      const tasks = await taskService.getAllTasksWithPagination(userId, page, pageSize)

      return res.json(tasks)
    } catch (error) {
      return res.status(500).json(error)
    }
  } 
}

export const taskController = new TaskController()