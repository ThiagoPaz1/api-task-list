import { Request, Response } from 'express'

import { userService } from '../service'

class UserController {
  public async newUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
      await userService.create({
        name,
        email,
        password
      })

      return res.status(201).json({ message: 'Successfully created' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

export const userController = new UserController()