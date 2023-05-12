import { Router } from 'express'

import { taskController } from '../modules/tasks/controllers'
import { validateData } from '../middlewares/ValidateData'

const route = Router()

route.use('/', validateData.verirfyAuthentication)

route.post('/',validateData.newTaskData, taskController.newTask)

export const taskRoute = route