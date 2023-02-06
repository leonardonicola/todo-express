import { PostgresDataSource } from '../config/ormconfig'
import { Tasks } from '../entities/Tasks'

export class DeleteTaskService {
  async execute(id: string) {
    const repo = PostgresDataSource.getRepository(Tasks)

    const task = await repo.findOneBy({ id })
    
    if (!task) {
      return new Error("Task doesn't exists!")
    }

    await repo.delete(id)
  }
}
