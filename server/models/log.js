const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema

const logSchema = new Schema({
  started_at: {
    type: Date,
    required: true
  },
  ended_at: {
    type: Date,
    required: true
  },
  broadcaster_id: {
    type: String,
    required: true
  },
  type: {
    type: String
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

logSchema.virtual('broadcaster', {
  ref: 'Broadcaster',
  localField: 'broadcaster_id',
  foreignField: 'id',
  justOne: true
})

logSchema.plugin(findOrCreate)

module.exports.Log = mongoose.model('Log', logSchema)
