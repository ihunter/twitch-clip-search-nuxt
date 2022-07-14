const mongoose = require('mongoose')
const { Clip } = require('../models')

async function prune() {
  try {
    await mongoose.connect('mongodb+srv://Hunter:sF9eb40L4gt24nHe@cluster0-nd0zz.mongodb.net/twitch-clip-search?retryWrites=true&w=majority&readPreference=primaryPreferred')
  } catch (error) {
    console.error(error)
  }
  console.log('Starting')
  const clips = await Clip.deleteMany({ view_count: { $lte: 1 } })
  console.log(clips)
}

prune()