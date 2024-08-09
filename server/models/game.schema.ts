import { defineMongooseModel } from '#nuxt/mongoose'
import type { Game } from '~/types'

export const GameSchema = defineMongooseModel<Game>({
  name: 'Game',
  schema: {
    id: {
      type: String,
      required: true,
      index: 1,
    },
    name: {
      type: String,
      required: true,
      index: 'text',
    },
    box_art_url: {
      type: String,
      required: true,
    },
  },
  options: {
    toJSON: { virtuals: true },
  },
  hooks(schema) {
    schema.virtual('clips', {
      ref: 'Clip',
      localField: 'id',
      foreignField: 'game_id',
    })
  },
})
