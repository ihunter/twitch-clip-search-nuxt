const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const searchSchema = new Schema({
  broadcaster_id: {
    type: [{ type: String, ref: 'Broadcaster' }]
  },
  creator_name: {
    type: String
  },
  game_id: [{ type: String, ref: 'Game' }],
  title: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, { toJSON: { virtuals: true }, timestamps: true })

searchSchema.virtual('games', {
  ref: 'Game',
  localField: 'game_id',
  foreignField: 'id'
})

searchSchema.virtual('broadcaster', {
  ref: 'Broadcaster',
  localField: 'broadcaster_id',
  foreignField: 'id'
})

searchSchema.plugin(mongoosePaginate)

module.exports.Search = mongoose.model('Search', searchSchema)
