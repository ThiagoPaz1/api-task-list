import { Router } from 'express'

import { userController } from '../modules/user/controllers'
import { validateData } from '../middlewares/ValidateData'

const route = Router()

route.post('/login', validateData.loginData, userController.singIn)
route.post('/', validateData.newUserData, userController.newUser)

export const userRoute = route