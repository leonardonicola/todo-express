import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import { PostgresDataSource } from './data-source'

// Iniciar a conexão com o banco de dados
PostgresDataSource.initialize()
  .then(() => {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(routes)

    return app.listen(3000, () => {
      console.log(`Tasks server listening at http://localhost:3000`)
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
