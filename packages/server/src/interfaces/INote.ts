import { Document, Model } from 'mongoose'

export interface INote {
  title: string
  content: string
  date: Date
}

export interface INote {
  title: string
  content: string
  date: Date
}

export interface INoteDocument extends INote, Document {}

export interface INoteModel extends Model<INote> {
  buildUser(args: INote): INoteDocument
}
