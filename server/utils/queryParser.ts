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

function createDateQuery(startDate?: string, endDate?: string) {
  const created_at: MongooseQuery['created_at'] = {}
  if (startDate)
    created_at.$gt = startDate
  if (endDate)
    created_at.$lt = endDate
  return Object.keys(created_at).length ? created_at : undefined
}

function createOrderQuery(sort: string, title?: string) {
  switch (sort) {
    case 'views':
      return { view_count: -1 }
    case 'oldest':
      return { created_at: 1 }
    case 'newest':
      return { created_at: -1 }
    case 'title':
      return title
        ? { score: { $meta: 'textScore' }, view_count: -1 }
        : { view_count: -1 }
    default:
      return title
        ? { score: { $meta: 'textScore' }, view_count: -1 }
        : { view_count: -1 }
  }
}

export function clipsQuery(event: H3Event) {
  const { title, page, sort, limit, creator, game, startDate, endDate } = getQuery<QueryParams>(event)

  const query: MongooseQuery = {}

  if (title) {
    query.$text = { $search: title }
  }

  if (creator) {
    query.creator_name = { $regex: new RegExp(`^${creator}$`, 'i') }
  }

  if (game) {
    query.game_id = game
  }

  const created_at = createDateQuery(startDate, endDate)
  if (created_at) {
    query.created_at = created_at
  }

  const order = createOrderQuery(sort, title)

  return {
    query,
    page: Number.isNaN(Number.parseInt(page)) ? 1 : Number.parseInt(page),
    limit: Number.isNaN(Number.parseInt(limit)) ? 12 : Number.parseInt(limit),
    order,
  }
}
