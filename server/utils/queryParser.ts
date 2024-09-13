import type { H3Event } from 'h3'

interface QueryParams {
  title: string
  page: string
  sort: string
  limit: string
  creator: string
  game: string
  startDate: string
  endDate: string
}

interface MongooseQuery {
  $text?: { $search: string }
  creator_name?: { $regex: RegExp }
  game_id?: string | string[]
  created_at?: {
    $lt?: string
    $gt?: string
  }
}

export function clipsQuery(event: H3Event) {
  const { title, page, sort, limit, creator, game, startDate, endDate } = getQuery<QueryParams>(event)

  const query: MongooseQuery = {}

  if (title) {
    query.$text = { $search: title }
  }

  if (creator) {
    query.creator_name = {
      $regex: new RegExp(`^${creator}$`, 'i'),
    }
  }

  if (game) {
    query.game_id = game
  }

  if (startDate && endDate) {
    query.created_at = {
      $gt: startDate,
      $lt: endDate,
    }
  }
  else if (startDate) {
    query.created_at = {
      $gt: startDate,
    }
  }
  else if (endDate) {
    query.created_at = {
      $lt: endDate,
    }
  }

  let order
  switch (sort) {
    case 'views':
      order = { view_count: -1 }
      break
    case 'oldest':
      order = { created_at: 1 }
      break
    case 'newest':
      order = { created_at: -1 }
      break
    case 'title':
      if (title) {
        order = { score: { $meta: 'textScore' }, view_count: -1 }
      }
      else {
        order = { view_count: -1 }
      }
      break
    default:
      if (title) {
        order = { score: { $meta: 'textScore' }, view_count: -1 }
      }
      else {
        order = { view_count: -1 }
      }
  }

  return {
    query,
    page,
    limit,
    order,
  }
}
