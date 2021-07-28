const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema

const logSchema = new Schema({
  date_cursor: {
    type: Date,
    default: Date.now
  },
  broadcaster_id: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  progress: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'completed'
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

logSchema.virtual('broadcaster', {
  ref: 'Broadcaster',
  localField: 'broadcaster_id',
  foreignField: 'id',
  justOne: true
})

logSchema.plugin(findOrCreate)

module.exports.Log = mongoose.model('Log', logSchema)
