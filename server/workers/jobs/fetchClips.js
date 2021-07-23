require('dotenv').config()
const consola = require('consola')
const moment = require('moment')

const { Broadcaster, Clip, Log } = require('../../models')
const { API } = require('../../utils/twitch-api')
const { addGames } = require('./addGames')
const { getAuthToken } = require('./getAuthToken')

const OLDEST_START_DATE = '2016-04-01T00:00:00Z'

exports.fetchClips = async (type) => {
  try {
    await getAuthToken()
  } catch (error) {
    consola.error('Error getting Auth Token')
    consola.error(error)
  }

  let startingDate
  switch (type) {
    case 'all':
      startingDate = OLDEST_START_DATE
      break
    case 'week':
      startingDate = moment.utc().startOf('day').subtract(1, 'week').toISOString()
      break
    case 'month':
      startingDate = moment.utc().startOf('day').subtract(1, 'month').toISOString()
      break
    case 'year':
      startingDate = moment.utc().startOf('day').subtract(1, 'year').toISOString()
      break
    default:
      type = 'week'
      startingDate = moment.utc().startOf('day').subtract(1, 'week').toISOString()
      break
  }

  const api = await API()
  const broadcasters = await Broadcaster.find()

  const fetchers = broadcasters.map(async (broadcaster) => {
    let startedAt
    let endedAt

    const first = 100
    let log
    try {
      log = (await Log.findOrCreate({ type, broadcaster_id: broadcaster.id }, {
        started_at: startingDate,
        ended_at: moment.utc(startingDate).endOf('day').toISOString(),
        type
      })).doc
      startedAt = log.started_at
      endedAt = log.ended_at
    } catch (error) {
      consola.error(error)
    }

    let cursor = ''
    let matchedCount = 0
    let modifiedCount = 0
    let insertedCount = 0
    let upsertedCount = 0

    while (moment.utc(endedAt).isSameOrBefore(moment.utc().endOf('day'))) {
      let clips = []
      do {
        try {
          const res = await api.get(`clips?broadcaster_id=${broadcaster.id}&started_at=${startedAt}&ended_at=${endedAt}&first=${first}&after=${cursor}`)

          clips = clips.concat(res.data.data)
          cursor = res.data.pagination.cursor
        } catch (error) {
          consola.error('Error fetching clips')
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            consola.error(error.response.data)
            consola.error(error.response.status)
            consola.error(error.response.headers)
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            consola.error(error.request)
          } else {
            // Something happened in setting up the request and triggered an Error
            consola.error('Error', error.message)
          }
        }
      } while (cursor)

      if (clips.length > 0) {
        const result = await Clip.bulkWrite(clips.map((clip) => {
          // eslint-disable-next-line camelcase
          const { view_count, language } = clip
          delete clip.view_count
          delete clip.language
          return {
            updateOne: {
              filter: { id: clip.id },
              update: {
                $set: { view_count, language },
                $setOnInsert: clip
              },
              upsert: true
            }
          }
        }))

        matchedCount += result.matchedCount
        modifiedCount += result.modifiedCount
        insertedCount += result.insertedCount
        upsertedCount += result.upsertedCount
      }

      cursor = ''
      startedAt = moment.utc(startedAt).add(1, 'day').toISOString()
      endedAt = moment.utc(startedAt).endOf('day').toISOString()

      await Log.updateOne({ type, broadcaster_id: broadcaster.id }, {
        started_at: startedAt,
        ended_at: endedAt
      })
        .catch((error) => {
          consola.error('Error saving log')
          consola.error(error)
        })
    }

    try {
      startedAt = startingDate
      endedAt = moment.utc(startingDate).endOf('day').toISOString()
      await Log.updateOne({ type, broadcaster_id: broadcaster.id }, {
        started_at: startedAt,
        ended_at: endedAt
      })
    } catch (error) {
      consola.error(error)
    }
  })

  await Promise.all(fetchers)
    .catch((error) => {
      consola.error('Error fetching clips for all streamers')
      consola.error(error)
    })

  await addGames()
    .catch((error) => {
      consola.error('Error fetching games')
      consola.error(error)
    })
}