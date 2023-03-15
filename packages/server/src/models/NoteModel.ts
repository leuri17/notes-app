import { Schema, model, Model } from 'mongoose'
import { INote, INoteDocument, INoteModel } from '../interfaces/INote'

const noteSchema: Schema<INoteDocument> = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  },
  { timestamps: true }
)

// noteSchema.statics.buildNote = (args: INote) => {
//   return new Note(args)
// }

export const Note = model<INoteDocument, INoteModel>('Note', noteSchema)
