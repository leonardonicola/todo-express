const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const tasks = [
  { name: 'Aprender Nuxt', done: false },
  { name: 'Aprender Express.js', done: false },
  { name: 'Aprender Docker', done: true },
]

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/add', (req, res) => {
  res.json(req.body)
})

app.listen(3000, () => {
  console.log(`Tasks server listening at http://localhost:3000`)
})
