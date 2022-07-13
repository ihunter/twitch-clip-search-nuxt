const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  box_art_url: {
    type: String,
    required: true
  }
}, { toJSON: { virtuals: true }, /* timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } */ })

gameSchema.virtual('clips', {
  ref: 'Clip',
  localField: 'id',
  foreignField: 'game_id'
})

gameSchema.index({ id: 1 })
gameSchema.index({ name: 'text' })

module.exports.Game = mongoose.model('Game', gameSchema)
