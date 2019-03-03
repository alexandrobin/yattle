import Query, {
  Controller,
} from '@foundationjs/query'

if (typeof window !== 'undefined') {
  console.log(process.env.YATTLE_API)
  Query.configure({
    uri: process.env.YATTLE_API,
  })
}


const TaskController = new Controller('task')
const UserController = new Controller('user')
export { TaskController, UserController }
