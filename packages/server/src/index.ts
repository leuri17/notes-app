import express, { Express } from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
// import { userService } from './services/UserService.js'
// import { noteService } from './services/NoteService.js'

// Initializations
const app: Express = express()
const { ENV, DB_PROD_URI, DB_DEV_URI } = process.env
const connectionString = ENV === 'dev' ? DB_DEV_URI : DB_PROD_URI

// DB Connection
mongoose
  .connect(connectionString as string)
  .then((db) => {
    console.log('Connected to DB:', db.connection.name)
  })
  .catch((err) => {
    console.error(err)
  })

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// Server
app.listen(app.get('port'), () => {
  console.log(`🚀 Server listening on port ${app.get('port')}`)
})
