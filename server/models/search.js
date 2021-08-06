const mongoose = require('mongoose')
const Schema = mongoose.Schema

const searchSchema = new Schema({
  broadcaster_id: {
    type: [String]
  },
  creator_name: {
    type: String
  },
  game_id: {
    type: [String]
  },
  title: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, { timestamps: true })

module.exports.Search = mongoose.model('Search', searchSchema)
