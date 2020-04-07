const moment = require('moment')
const { Clip } = require('../../models')

module.exports = {
  async clips ({ clipInput }) {
    const query = {}

    if (clipInput.title) {
      query.$text = { $search: clipInput.title }
    }

    // Match creator name
    if (clipInput.creator) {
      query.creator_name = { $regex: new RegExp(clipInput.creator, 'i') }
    }

    if (clipInput.game) {
      query.game_id = clipInput.game
    }

    if (clipInput.broadcaster) {
      query.broadcaster_id = clipInput.broadcaster
    }

    if (clipInput.startDate && clipInput.endDate) {
      query.created_at = {
        $lt: moment.utc(clipInput.endDate).endOf('day').toISOString(),
        $gt: moment.utc(clipInput.startDate).startOf('day').toISOString()
      }
    } else if (clipInput.startDate) {
      query.created_at = {
        $gt: moment.utc(clipInput.startDate).startOf('day').toISOString()
      }
    } else if (clipInput.endDate) {
      query.created_at = {
        $lt: moment.utc(clipInput.endDate).endOf('day').toISOString()
      }
    }

    // Determine order based on query
    let order

    switch (clipInput.sort) {
      case '1':
        order = { view_count: -1 }
        break
      case '2':
        order = { created_at: 1 }
        break
      case '3':
        order = { created_at: -1 }
        break
      case '4':
        clipInput.title ? order = { score: { $meta: 'textScore' } } : order = { view_count: -1 }
        break
      default:
        order = { view_count: -1 }
    }

    const limit = 12
    const count = await Clip.find(query).countDocuments()
    const clips = await Clip.find(query)
      .limit(limit)
      .sort(order)
      .populate('game')
      .populate('broadcaster')

    return { clips, count }
  }
}
