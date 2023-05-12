import { Router } from 'express'

import { taskController } from '../modules/tasks/controllers'
import { validateData } from '../middlewares/ValidateData'

const route = Router()

route.use('/', validateData.verirfyAuthentication)

route.get('/filter')
route.get('/getAll', taskController.getAllTasks)
route.post('/',validateData.newTaskData, taskController.newTask)

export const taskRoute = route