import { Router } from 'express'

import { userController } from '../modules/user/controller'
import { validateData } from '../middlewares/ValidateData'

const route = Router()

route.post('/login', validateData.loginData, userController.singIn)
route.post('/', validateData.body, userController.newUser)

export const userRoute = route