const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const clipSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  broadcaster_id: {
    type: String,
    required: true
  },
  broadcaster_name: {
    type: String,
    required: true
  },
  // creator_id: {
  //   type: String,
  //   required: true
  // },
  creator_name: {
    type: String,
    required: true
  },
  // video_id: {
  //   type: String,
  //   required: false
  // },
  game_id: {
    type: String,
    required: true
  },
  // language: {
  //   type: String,
  //   required: false
  // },
  title: {
    type: String,
    required: true
  },
  view_count: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  thumbnail_url: {
    type: String,
    required: true
  }
}, { toJSON: { virtuals: true } /*, timestamps: { updatedAt: 'updated_at', createdAt: false }*/ })

clipSchema.index({ title: 'text' })
clipSchema.index({ id: 1 })
clipSchema.index({ view_count: 1 })
clipSchema.index({ created_at: 1 })

clipSchema.virtual('broadcaster', {
  ref: 'Broadcaster',
  localField: 'broadcaster_id',
  foreignField: 'id',
  justOne: true
})

clipSchema.virtual('game', {
  ref: 'Game',
  localField: 'game_id',
  foreignField: 'id',
  justOne: true
})

clipSchema.plugin(mongoosePaginate)

module.exports.Clip = mongoose.model('Clip', clipSchema)
