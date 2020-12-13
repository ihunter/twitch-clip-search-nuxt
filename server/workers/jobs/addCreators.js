require('dotenv').config()
const consola = require('consola')
const rateLimit = require('axios-rate-limit')

const { Clip, Creator } = require('../../models')

const { API } = require('../../utils/twitch-api')

async function addCreators () {
  try {
    const api = rateLimit(await API(), { maxRPS: 13 })
    let creators = await Clip.distinct('creator_id')

    // Filter non games
    creators = creators.filter(creator => creator !== '')

    // Breakup creators into batches of 100 IDs
    const creatorBatches = []
    const chunkSize = 100
    for (let i = 0; i < creators.length; i += chunkSize) {
      creatorBatches.push(creators.slice(i, i + chunkSize).join('&id='))
    }

    const creatorPromises = creatorBatches.map(async (creatorIDs) => {
      const res = await api.get(`users?id=${creatorIDs}`)
      return res.data.data
    })

    const creatorsDataArray = await Promise.all(creatorPromises)

    const creatorsData = creatorsDataArray.flat()

    await Creator.bulkWrite(creatorsData.map((creator) => {
      return {
        updateOne: {
          filter: { id: creator.id },
          update: creator,
          upsert: true
        }
      }
    }))
  } catch (error) {
    consola.error('Failed to fetch creators data')

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
}

module.exports = {
  addCreators
}
