const moment = require('moment')
const {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType 
} = require('graphql-parse-resolve-info')
const { Broadcaster, Clip, Game } = require('../../models')

module.exports = {
  async allClips ({ query }, _, info) {
    const parsedResolveInfoFragment = parseResolveInfo(info)
    const { fields } = simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfoFragment,
      info.returnType
    )
    const selectedFields = Object.keys(fields.clips.fieldsByTypeName.Clip).join(' ')

    const mongoQuery = {}

    if (query.title) {
      mongoQuery.$text = { $search: query.title }
    }

    // Match creator name
    if (query.creator) {
      mongoQuery.creator_name = { $regex: new RegExp(`^${query.creator}$`, 'i') }
    }

    if (query.game && query.game.length > 0) {
      mongoQuery.game_id = query.game
    }

    if (query.broadcaster) {
      mongoQuery.broadcaster_id = query.broadcaster
    }

    if (query.startDate && query.endDate) {
      mongoQuery.created_at = {
        $lt: moment(query.endDate).endOf('day').toISOString(),
        $gt: moment(query.startDate).startOf('day').toISOString()
      }
    } else if (query.startDate) {
      mongoQuery.created_at = {
        $gt: moment(query.startDate).startOf('day').toISOString()
      }
    } else if (query.endDate) {
      mongoQuery.created_at = {
        $lt: moment(query.endDate).endOf('day').toISOString()
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
        if (query.title) {
          order = { score: { $meta: 'textScore' }, view_count: -1 }
        } else {
          order = { view_count: -1 }
        }
        break
      default:
        if (query.title) {
          order = { score: { $meta: 'textScore' }, view_count: -1 }
        } else {
          order = { view_count: -1 }
        }
    }

    try {
      const { clips, count } = await Clip.paginate(mongoQuery, {
        select: `${selectedFields} game_id`,
        sort: order,
        populate: 'game',
        // projection: { score: { $meta: 'textScore' } }, Breaks search when no title is given???
        lean: true,
        page: query.page > 0 ? query.page : 1,
        limit: query.limit > 0 ? query.limit : 12,
        customLabels: {
          docs: 'clips',
          totalDocs: 'count'
        }
      })

      return { clips , count }
    } catch (error) {
      console.error('Error fetching clips:', error) 
    }
  },
  async allGames ({ query }) {
    if (!query.name && (!query.gameID || query.gameID.length <= 0)) return []

    const mongoQuery = {}

    if (query.broadcasterID) {
      // Find all unique game IDs for a broadcaster
      mongoQuery.id = await Clip.find({ broadcaster_id: query.broadcasterID }).distinct('game_id').exec()
    }

    if (query.name) {
      mongoQuery.$text = { $search: query.name }
    } else if (query.gameID && query.gameID.length > 0) {
      mongoQuery.id = query.gameID
    }

    return await Game.find(mongoQuery).exec()
  },
  async allBroadcasters () {
    return await Broadcaster.find().exec()
  }
}
