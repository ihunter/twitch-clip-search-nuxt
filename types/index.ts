import type { ObjectId } from 'mongoose'

export interface Clip {
  _id: ObjectId
  id: string
  url: string
  broadcaster_id: string
  broadcaster_name: string
  creator_name: string
  game_id: string
  title: string
  view_count: number
  created_at: string
  thumbnail_url: string
}

export interface Game {
  _id: ObjectId
  id: string
  name: string
  box_art_url: string
}
