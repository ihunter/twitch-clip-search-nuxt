export interface Clip {
  _id: string
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
  game: Game | null
}

export interface ClipResponse {
  docs: Clip[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface Game {
  _id: string
  id: string
  name: string
  box_art_url: string
}

export interface GameResponse {
  _id: string
  id: string
  box_art_url: string
  name: string
}
