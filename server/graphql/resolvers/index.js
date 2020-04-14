const moment = require('moment')
const { Broadcaster, Clip, Game } = require('../../models')

module.exports = {
  async allClips ({ query }) {
    const mongoQuery = {}

    if (query.title) {
      mongoQuery.$text = { $search: query.title }
    }

    // Match creator name
    if (query.creator) {
      mongoQuery.creator_name = { $regex: new RegExp(query.creator, 'i') }
    }

    if (query.game) {
      mongoQuery.game_id = query.game
    }

    if (query.broadcaster) {
      mongoQuery.broadcaster_id = query.broadcaster
    }

    if (query.startDate && query.endDate) {
      mongoQuery.created_at = {
        $lt: moment.utc(query.endDate).endOf('day').toISOString(),
        $gt: moment.utc(query.startDate).startOf('day').toISOString()
      }
    } else if (query.startDate) {
      mongoQuery.created_at = {
        $gt: moment.utc(query.startDate).startOf('day').toISOString()
      }
    } else if (query.endDate) {
      mongoQuery.created_at = {
        $lt: moment.utc(query.endDate).endOf('day').toISOString()
      }
    }

    // Determine order based on query
    let order

    switch (query.sort) {
      case 1:
        order = { view_count: -1 }
        break
      case 2:
        order = { created_at: 1 }
        break
      case 3:
        order = { created_at: -1 }
        break
      case 4:
        mongoQuery.title ? order = { score: { $meta: 'textScore' } } : order = { view_count: -1 }
        break
      default:
        order = { view_count: -1 }
    }

    const limit = query.limit > 0 ? query.limit : 24
    const page = query.page > 0 ? query.page : 1
    const skip = (page - 1) * limit
    const count = await Clip.find(mongoQuery).countDocuments()
    const clips = await Clip.find(mongoQuery)
      .sort(order)
      .skip(skip)
      .limit(limit)
      .populate('game')
      .populate('broadcaster')

    return { clips, count }
  },
  async allGames ({ broadcasterID }) {
    if (broadcasterID) {
      // Find all unique game IDs for a broadcaster
      const gameIDs = await Clip.find({ broadcaster_id: broadcasterID }).distinct('game_id')
      return await Game.find({ id: { $in: gameIDs } })
    }

    return await Game.find()
  },
  async allBroadcasters () {
    return await Broadcaster.find()
  }
}
