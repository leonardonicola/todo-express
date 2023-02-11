import 'reflect-metadata'
import { DataSource } from "typeorm"
import {CreateTodo1676128376509} from './migrations/1676128376509-CreateTodo'
import { Tasks } from './entities/Tasks'

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "todo_crud",
    entities: [Tasks],
    migrations:[CreateTodo1676128376509]
})