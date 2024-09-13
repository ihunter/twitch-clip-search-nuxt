import mongoose from 'mongoose'

export default defineNitroPlugin(async (_nitroApp) => {
  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.mongodbUri)
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
})
