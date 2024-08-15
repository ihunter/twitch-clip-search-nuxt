export default defineEventHandler(async (event) => {
  const { title, page, sort, limit } = getQuery(event)

  const query = {}

  if (title) {
    query.$text = { $search: title }
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
  GameSchema.findOne()
  try {
    return await ClipSchema.paginate(query, { populate: 'game', page, sort: order, limit })
  }
  catch (error) {
    return error
  }
})
