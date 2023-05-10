import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectDB } from './database/tasksDB'
import { taskRepository } from './modules/task/repository'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
  try {
    const data = await taskRepository.getAll() 
    return res.json(data)
  } catch (error) {
    return res.status(500).json({message: error})
  }
})

app.listen(process.env.PORT, () => console.log('Server is running'))