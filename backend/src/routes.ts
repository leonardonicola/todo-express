import { Router } from 'express'
import { CreateTaskController } from './controllers/CreateTaskController'
import { GetTaskController } from './controllers/GetTaskController'
import { DeleteTaskController } from './controllers/DeleteTaskController'
import { UpdateTaskController } from './controllers/UpdateTaskController'

const routes = Router()

routes.get('/', new GetTaskController().handle)
routes.post('/', new CreateTaskController().handle)
routes.delete('/:id', new DeleteTaskController().handle)
routes.put('/:id', new UpdateTaskController().handle)

export { routes }
