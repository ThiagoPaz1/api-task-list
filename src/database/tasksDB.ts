import { AceBaseServer } from 'acebase-server'
import dotenv from 'dotenv'

import { schema } from '../schema'

dotenv.config()

const dbname = process.env.DB_NAME
const dbport = process.env.DB_PORT
const server = new AceBaseServer(String(dbname), {
  host: 'localhost',
  port: Number(dbport),
  authentication: {
    enabled: true,
    allowUserSignup: false,
    defaultAccessRule: 'auth',
    defaultAdminPassword: String(process.env.ADMIN_PASSWORD)
  }
})

export async function connectDB() {
  server.on('ready', async () => {
    await server.db.schema.set('users/$id', schema)
    console.log('Connected database')
  })
}

export const tasksDB = server.db