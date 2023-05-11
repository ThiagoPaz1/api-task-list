import { tasksDB } from '../../../database/tasksDB'

class TaskRepository {
  public async create(): Promise<void> {
    await tasksDB.ref('tasks').push({
      title: 'Academia',
      description: 'Tirar um tempo para academia.',
      created_at: new Date()
    })
  }
 
  public async getAll() {
    const tasks = await tasksDB.ref('tasks').get()
    return await tasks.val()
  }
}

export const taskRepository = new TaskRepository()