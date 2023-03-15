import { Router } from 'express'
import { CastError, Error } from 'mongoose'
import { Note } from '../models/NoteModel'

const noteRouter = Router()

/* GET */
noteRouter.get('/notes', async (req, res) => {
  res.status(200).json(await Note.find({}))
})

noteRouter.get('/notes/:id', async (req, res) => {
  const { id } = req.params

  try {
    const note = await Note.findById(id)

    if (!note) {
      res.status(404).json({
        error: 'Note not found'
      })
    }

    res.status(200).json(note)
  } catch (err: any) {
    console.error(err)

    res.status(500).json({
      error: `${err.name}: ${err.message.replaceAll('"', "'")}`
    })
  }
})

/* POST */
noteRouter.post('/note', async (req, res) => {
  const { title, content } = req.body

  if (!title) {
    return res.status(400).json({
      error: 'required "title" field is missing'
    })
  }

  const newNote = new Note({
    title,
    content
  })

  const savedNote = await newNote.save()

  res.status(201).json(savedNote)
})

/* PUT */
/* DELETE */

export { noteRouter }
