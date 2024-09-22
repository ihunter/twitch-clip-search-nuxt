import type { Document, PaginateModel } from 'mongoose'
import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

interface ISearch {
  ip: string
  userAgent: string
  title: string
}

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

SearchSchema.plugin(mongoosePaginate)

interface SearchDocument extends Document, ISearch {}

export const Search = model<SearchDocument, PaginateModel<SearchDocument>>('Search', SearchSchema)
