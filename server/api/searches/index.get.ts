import { Search } from '~/server/models/search.model'

export default defineCachedEventHandler(async (event) => {
  interface QueryParams {
    page: string
    limit: string
  }

  const { page, limit } = getQuery<QueryParams>(event)

  try {
    return await Search.paginate({}, {
      page,
      limit,
      sort: { createdAt: -1 },
    })
  }
  catch (error) {
    return error
  }
}, {
  maxAge: 1,
})
