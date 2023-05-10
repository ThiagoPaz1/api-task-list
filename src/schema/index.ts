export const schema = {
  name: 'string',
  email: 'string',
  password: 'string',
  "tasks?": Array<{
    "taskid": {
      title: 'string',
      description: 'string',
      created_at: 'Date',
    }
  }>
}