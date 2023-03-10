import { PostgresDataSource } from '../data-source'
import { Tasks } from '../entities/Tasks'

export class GetTasksService {
    async execute(){
        const repo = PostgresDataSource.getRepository(Tasks)

        const tasks = await repo.find();

        return tasks
    }
}
