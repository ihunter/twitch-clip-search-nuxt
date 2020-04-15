const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creatorSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  broadcaster_type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  profile_image_url: {
    type: String,
    required: true
  },
  offline_image_url: {
    type: String,
    required: true
  },
  view_count: {
    type: Number,
    required: true
  }
}, { toJSON: { virtuals: true }, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

creatorSchema.virtual('clips', {
  ref: 'Clip',
  localField: 'id',
  foreignField: 'creator_id'
})

creatorSchema.index({ id: 1 })

module.exports.Creator = mongoose.model('Creator', creatorSchema)
