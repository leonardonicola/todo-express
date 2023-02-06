import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'reflect-metadata'
import { routes } from './routes'
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(routes)

app.listen(3000, () => {
  console.log(`Tasks server listening at http://localhost:3000`)
})
