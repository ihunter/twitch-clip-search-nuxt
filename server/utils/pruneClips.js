require('dotenv').config()
const mongoose = require('mongoose')
const { Clip } = require('../models')

async function prune() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error(error)
  }
  console.log('Starting')
  const clips = await Clip.deleteMany({ view_count: { $lte: 1 } })
  console.log(clips)
}

prune()
  .then(() => {
    console.log('Done')
  })
  .catch(errror => {
    console.error(error)
  })