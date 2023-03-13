import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './app.css'

interface Note {
  id: string
  title: string
  content: string
  date: Date
}

const App = () => {
  const [notes, setNotes] = useState<Array<Note>>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleChange = (e: ChangeEvent) => {
    e.preventDefault()

    if (e.target.id.includes('title')) {
      setTitle((e.target as HTMLTextAreaElement).value)
    } else {
      setContent((e.target as HTMLTextAreaElement).value)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const note: Note = {
      id: uuidv4(),
      title,
      content,
      date: new Date()
    }

    setNotes(notes.concat(note))
  }

  const deleteNote = (e: MouseEvent<HTMLButtonElement>) => {
    setNotes(
      notes.filter(
        (note) => note.id != (e.target as HTMLElement).dataset.noteId
      )
    )
  }

  return (
    <>
      <header>
        <h1>Notes App</h1>
      </header>

      <section id='main'>
        <form action='' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='note-title-input'>Title:</label>
            <br />
            <input
              type='text'
              name='note-title'
              id='note-title-input'
              value={title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='note-content-input'>Content:</label>
            <br />
            <input
              type='text'
              name='note-content'
              id='note-content-input'
              value={content}
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit'>Add</button>
        </form>

        <div id='note-list'>
          <ul>
            {notes.map((n) => (
              <li key={n.id}>
                <h3>
                  {n.title}
                  <span
                    className='date'
                    style={{
                      fontWeight: 'lighter',
                      fontSize: '.45em',
                      marginLeft: '10px'
                    }}
                  >
                    {n.date.toLocaleDateString()}
                  </span>
                </h3>
                <p>{n.content}</p>

                <button onClick={deleteNote} data-note-id={n.id}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer>Coded by Leuri</footer>
    </>
  )
}

export default App
