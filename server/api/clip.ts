export default defineEventHandler(async () => {
  // Used to register model, otherwise populate won't work
  GameSchema.findOne()
  try {
    return await ClipSchema.paginate({}, { populate: 'game' })
  }
  catch (error) {
    return error
  }
})
