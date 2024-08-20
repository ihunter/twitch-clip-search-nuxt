import { Game } from '~/server/models/game.model'
import { Clip } from '~/server/models/clip.model'

export default defineCachedEventHandler(async (event) => {
  interface QueryParams {
    title: string
    page: string
    sort: string
    limit: string
    creator: string
    game: string
  }

  const { title, page, sort, limit, creator, game } = getQuery<QueryParams>(event)

  interface MongooseQuery {
    $text?: { $search: string }
    creator_name?: { $regex: RegExp }
    game_id?: string[]
  }

  const query: MongooseQuery = {
  }

  if (title) {
    query.$text = { $search: title }
  }

  if (creator) {
    query.creator_name = {
      $regex: new RegExp(`^${creator}$`, 'i'),
    }
  }

  if (game) {
    query.game_id = game.split(',')
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

  // Used to register model, otherwise populate won't work
  Game.findOne()
  try {
    return await Clip.paginate(query, { populate: 'game', page, sort: order, limit })
  }
  catch (error) {
    return error
  }
}, {
  maxAge: 5,
})
