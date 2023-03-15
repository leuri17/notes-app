import express, { json } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'

import { Note } from './models/NoteModel'
import { noteRouter } from './routes/NoteRouter'
// import { userService } from './services/UserService.js'
// import { noteService } from './services/NoteService.js'

// Initializations
const app = express()
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
app.use(morgan('dev'))
app.use(json())

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.use(noteRouter)

// Server
app.listen(app.get('port'), () => {
  console.log(`🚀 Server listening on port ${app.get('port')}`)
})
