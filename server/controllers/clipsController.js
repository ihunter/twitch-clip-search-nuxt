const moment = require('moment')
const { Clip } = require('../models/clip')

exports.get = async (req, res) => {
  try {
    const query = {}

    // Extract query params
    const {
      title,
      broadcaster,
      page,
      sort,
      creator,
      game,
      startDate,
      endDate
    } = req.query

    // Match creator name
    if (creator) {
      query.creator_name = { $regex: new RegExp(creator, 'i') }
    }

    if (game) {
      query.game_id = game
    }

    if (broadcaster) {
      query.broadcaster_id = broadcaster
    }

    // Create WHERE LIKE based on multi word title
    if (title) {
      query.$text = { $search: title }
    }

    if (startDate && endDate) {
      query.created_at = {
        $lt: moment.utc(endDate).endOf('day').toISOString(),
        $gt: moment.utc(startDate).startOf('day').toISOString()
      }
    } else if (startDate) {
      query.created_at = {
        $gt: moment.utc(startDate).startOf('day').toISOString()
      }
    } else if (endDate) {
      query.created_at = {
        $lt: moment.utc(endDate).endOf('day').toISOString()
      }
    }

    // Determine order based on query
    let order

    switch (sort) {
      case '1':
        order = { 'view_count': -1 }
        break
      case '2':
        order = { 'created_at': 1 }
        break
      case '3':
        order = { 'created_at': -1 }
        break
      case '4':
        title ? order = { score: { $meta: 'textScore' } } : order = { 'view_count': -1 }
        break
      default:
        order = { 'view_count': -1 }
    }

    const limit = 12
    const skip = (+page - 1) * limit
    const count = await Clip.find(query).countDocuments()
    const clips = await Clip.find(query, { score: { $meta: 'textScore' } })
      .limit(limit)
      .skip(skip)
      .sort(order)
      .populate('game')
      .populate('broadcaster')

    res.send({ clips, count })
  } catch (error) {
    res.status(500).send({
      msg: 'Error fetching clips',
      error
    })
  }
}
