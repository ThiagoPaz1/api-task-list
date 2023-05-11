import { Request, Response, NextFunction } from 'express'
import bcryptjs from 'bcryptjs'

import { userService } from '../modules/user/service'

class ValidateData {
  public body(
    req: Request,
    res: Response,
    next: NextFunction): Response | void {
    const { email } = req.body
    const data = Object.values(req.body)
    const validateEmail = /\S+@\S+\.\S+/
    let invalidDataFound: boolean = false

    if (!validateEmail.test(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

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

  public async loginData(
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response | void> {
    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)
    const passwordCheck = bcryptjs.compareSync(password, user.password)
    
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