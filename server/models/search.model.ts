import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

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

export const Search = model('Search', SearchSchema)
