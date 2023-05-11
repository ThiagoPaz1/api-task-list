import { Request, Response, NextFunction } from 'express'
import bcryptjs from 'bcryptjs'

import { userService } from '../modules/user/service'

class ValidateData {
  public newTaskData(
    req: Request,
    res: Response,
    next: NextFunction): Response | void {
    const data = Object.values(req.body)
    let invalidDataFound: boolean = false

    if (data.length) {
      for (let i of data) {
        if (!i) invalidDataFound = true
      }
    } else {
      invalidDataFound = true
    }

    if (invalidDataFound) {
      return res.status(400).json({ message: 'Fill in all fields' })
    }

    next()
  }

  public async newUserData(
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response | void> {
      const { email, password, name } = req.body
      const { user } = await userService.getUserByEmail(email)
      const validateEmail = /\S+@\S+\.\S+/

      if (!name || name.length < 2) {
        return res.status(400).json({ message: 'Name requires at least 2 characters' })
      }

      if (user?.email) {
        return res.status(400).json({ message: 'E-mail already registered' })
      }

      if (!validateEmail.test(email)) {
        return res.status(400).json({ message: 'Invalid email' })
      }
  
      if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password requires at least 6 characters' })
      }

      next()
    }

  public async loginData(
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response | void> {
    const { email, password } = req.body
    const { user } = await userService.getUserByEmail(email)
    const passwordCheck = (password && user.password) && bcryptjs.compareSync(password, user.password)
    
    if (!passwordCheck) {
      return res.status(401).json({message: 'Invalid e-mail or password'})
    }

    if (user.email !== email) {
      return res.status(401).json({message: 'Invalid e-mail or password'})
    }

    next()
  }

  // public async params(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction): Promise<Response | void> {
  //   const { id } = req.params
  //   const task = await taskService.getById(id)
  //   const check = Object.values(task)

  //   if (!id || !check.length) {
  //     return res.status(404).json({ message: 'Id not found' })
  //   }

  //   next()
  // }
}

export const validateData = new ValidateData()