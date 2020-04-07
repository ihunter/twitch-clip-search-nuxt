const { Clip } = require('../../models')

module.exports = {
  async clips ({ clipInput }) {
    const query = {}

    if (clipInput.title) {
      query.$text = { $search: clipInput.title }
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
