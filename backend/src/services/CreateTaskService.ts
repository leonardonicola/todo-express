import { PostgresDataSource } from '../data-source'
import { Tasks } from '../entities/Tasks'

type TaskRequest = {
  name: string
  done: boolean
}

export class CreateTaskService {
    async execute({name, done}: TaskRequest): Promise<Tasks>{
        const repo = PostgresDataSource.getRepository(Tasks)

        const task = repo.create({
            name,
            done
        });

        await repo.save(task)

        return task
    }
}
