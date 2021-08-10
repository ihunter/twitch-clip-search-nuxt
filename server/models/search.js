const mongoose = require('mongoose')
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

searchSchema.virtual('game', {
  ref: 'Game',
  localField: 'game_id',
  foreignField: 'id'
})

searchSchema.virtual('broadcaster', {
  ref: 'Broadcaster',
  localField: 'broadcaster_id',
  foreignField: 'id'
})

module.exports.Search = mongoose.model('Search', searchSchema)
