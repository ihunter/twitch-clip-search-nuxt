require('dotenv').config()
const consola = require('consola')
const moment = require('moment')

const { Clip, Log } = require('../../models')
const { API } = require('../../utils/twitch-api')
const { addGames } = require('./addGames')
const { getAuthToken } = require('./getAuthToken')

const OLDEST_START_DATE = '2016-04-01T00:00:00Z'

exports.fetchClips = async (type, broadcaster, stateManager) => {
  stateManager[type] = true

  try {
    await getAuthToken()
  } catch (error) {
    consola.error('Error getting Auth Token:', error)
  }

  let startingDate
  switch (type) {
    case 'all':
      startingDate = OLDEST_START_DATE
      break
    case 'week':
      startingDate = moment.utc().startOf('day').subtract(1, 'week')
      break
    case 'month':
      startingDate = moment.utc().startOf('day').subtract(1, 'month')
      break
    case 'year':
      startingDate = moment.utc().startOf('day').subtract(1, 'year')
      break
    default:
      type = 'week'
      startingDate = moment.utc().startOf('day').subtract(1, 'week')
      break
  }

  const api = await API()

  const first = 100
  let log
  try {
    log = (await Log.findOneAndUpdate({ type, broadcaster_id: broadcaster.id }, { progress: 'in-progress', updated_at: Date.now() }))
    if (log.progress === 'in-progress') {
      startingDate = log.date_cursor
      console.log(`Fetching ${type === 'all' ? type : type + 's'} clips for ${broadcaster.display_name} from cursor`)
    } else {
      console.log(`Fetching ${type === 'all' ? type : type + 's'} clips for ${broadcaster.display_name} from scratch`)
    }
  } catch (error) {
    consola.error('Error fetching log:', error)
  }

  let cursor = ''
  let matchedCount = 0
  let modifiedCount = 0
  let insertedCount = 0
  let upsertedCount = 0

  while (moment.utc(startingDate).endOf('day').isSameOrBefore(moment.utc().endOf('day'))) {
    let clips = []
    do {
      try {
        const startDate = moment.utc(startingDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]')
        const endDate = moment.utc(startingDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]')
        const res = await api.get(`clips?broadcaster_id=${broadcaster.id}&started_at=${startDate}&ended_at=${endDate}&first=${first}&after=${cursor}`)

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
      try {
        const result = await Clip.bulkWrite(clips.map((clip) => {
          // eslint-disable-next-line camelcase
          const { view_count, language, title } = clip
          delete clip.view_count
          delete clip.language
          delete clip.title
          return {
            updateOne: {
              filter: { id: clip.id },
              update: {
                $set: { view_count, language, title },
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
      } catch (error) {
        consola.error('Error bulk writing clips:', error)
      }
    }

    cursor = ''
    startingDate = moment.utc(startingDate).add(1, 'day')

    await Log.updateOne({ type, broadcaster_id: broadcaster.id }, {
      date_cursor: startingDate,
      updated_at: Date.now()
    })
      .catch((error) => {
        consola.error('Error saving log:', error)
      })
  }

  try {
    await Log.updateOne({ type, broadcaster_id: broadcaster.id }, {
      progress: 'completed',
      updated_at: Date.now()
    })
    stateManager[type] = false
    console.log(`Completed fetching ${type === 'all' ? type : type + 's'} clips for ${broadcaster.display_name}`)
    console.log(`matched: ${matchedCount}\nmodified: ${modifiedCount}\ninserted: ${insertedCount}\nupserted: ${upsertedCount}\n`)
  } catch (error) {
    consola.error('Error updating log:', error)
  }

  await addGames()
    .catch((error) => {
      consola.error('Error fetching games:', error)
    })
}