const { Clip } = require('../../models')

module.exports = {
  async clips () {
    const limit = 12
    const count = await Clip.find().countDocuments()
    const clips = await Clip.find()
      .limit(limit)
      .populate('game')
      .populate('broadcaster')

    return { clips, count }
  }
}
