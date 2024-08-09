import mongoosePaginate from 'mongoose-paginate-v2'
import { defineMongooseModel } from '#nuxt/mongoose'
import type { Clip } from '~/types'

export const ClipSchema = defineMongooseModel<Clip>({
  name: 'Clip',
  schema: {
    id: {
      type: String,
      required: true,
      index: 1,
    },
    url: {
      type: String,
      required: true,
    },
    broadcaster_id: {
      type: String,
      required: true,
    },
    broadcaster_name: {
      type: String,
      required: true,
    },
    creator_name: {
      type: String,
      required: true,
    },
    game_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      index: 'text',
    },
    view_count: {
      type: Number,
      required: true,
      index: 1,
    },
    created_at: {
      type: Date,
      required: true,
      index: 1,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
  },
  options: {
    toJSON: { virtuals: true },
  },
  hooks(schema) {
    // schema.virtual('broadcaster', {
    //   ref: 'Broadcaster',
    //   localField: 'broadcaster_id',
    //   foreignField: 'id',
    //   justOne: true,
    // })

    schema.virtual('game', {
      ref: 'Game',
      localField: 'game_id',
      foreignField: 'id',
      justOne: true,
    })

    schema.plugin(mongoosePaginate)
  },
})
