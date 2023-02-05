const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const tasks = [
  { name: 'Aprender Nuxt', done: false },
  { name: 'Aprender Express.js', done: false },
  { name: 'Aprender Docker', done: true },
]

app.use(bodyParser.json())
app.use(cors())

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/add', (req, res) => {
  res.json(req.body)
})

app.listen(3000, () => {
  console.log(`Tasks server listening at http://localhost:3000`)
})
