import { DataSource } from "typeorm"
export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "todo_express",
    migrations:['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts']
})

PostgresDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
