import { Game } from '~/server/models/game.model'

export default defineCachedEventHandler(async (event) => {
  interface QueryParams {
    search: string
  }

  interface MongooseQuery {
    $text?: { $search: string }
  }

  const { search } = getQuery<QueryParams>(event)

  const query: MongooseQuery = {}

  if (!search)
    return []

  query.$text = { $search: search }

  try {
    console.log(query)
    return await Game.find(query)
  }
  catch (error) {
    return error
  }
}, {
  maxAge: 1,
})
