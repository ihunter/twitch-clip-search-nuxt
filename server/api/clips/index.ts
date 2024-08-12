export default defineEventHandler(async () => {
  // Used to register model, otherwise populate won't work
  GameSchema.findOne()
  try {
    return await ClipSchema.paginate({ }, { populate: 'game', sort: { created_at: 1 }, limit: 24 })
  }
  catch (error) {
    return error
  }
})
