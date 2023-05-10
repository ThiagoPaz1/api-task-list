import { tasksDB } from '../../../database/tasksDB'

class TaskRepository {
  public async getAll(): Promise<any> {
    return await tasksDB.take(5).find()
  }
}

export const taskRepository = new TaskRepository()