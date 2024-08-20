import mongoose from 'mongoose'

export default defineNitroPlugin(async (_nitroApp) => {
  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.mongodbUri)
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB')
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
})
