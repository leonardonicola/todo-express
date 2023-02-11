import { PostgresDataSource } from '../data-source'
import { Tasks } from '../entities/Tasks'

type TaskUpdateRequest = {
    id: string
    name: string
    done: boolean
}

export class UpdateTaskService {
    async execute({id, name, done}: TaskUpdateRequest){
        const repo = PostgresDataSource.getRepository(Tasks)

        const task = await repo.findOneBy({id})

        if(!task) {
            return new Error("Task doesn't exists!")
        }
    
        // If not passed argument, use own data
        task.done = done !== undefined ? done : task.done
        task.name = name ? name : task.name

        await repo.save(task);

        return task
    }
}
