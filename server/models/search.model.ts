import { model, Schema } from 'mongoose'

const SearchSchema = new Schema({
  ip: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  title: {
    type: String,
  },
}, { timestamps: true })

export const Search = model('Search', SearchSchema)
