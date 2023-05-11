import { Request, Response } from 'express'

import { taskService } from '../services'

class TaskController {
  public async newTask(req: Request, res: Response): Promise<Response> {
    const { title, description, userId } = req.body

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
}

export const taskController = new TaskController()