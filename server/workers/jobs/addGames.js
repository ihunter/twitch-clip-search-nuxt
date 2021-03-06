require('dotenv').config()
const consola = require('consola')

const { Clip, Game } = require('../../models')

const { API } = require('../../utils/twitch-api')

async function addGames () {
  try {
    const api = await API()
    let games = await Clip.distinct('game_id')

    // Filter non games
    games = games.filter(game => game !== '')

    // Breakup games into batches of 100 IDs
    const gameBatches = []
    const chunkSize = 100
    for (let i = 0; i < games.length; i += chunkSize) {
      gameBatches.push(games.slice(i, i + chunkSize).join('&id='))
    }

    const gamesPromises = gameBatches.map(async (gameIDs) => {
      const res = await api.get(`games?id=${gameIDs}`)
      return res.data.data
    })

    const gamesDataArray = await Promise.all(gamesPromises)

    const gamesData = gamesDataArray.flat()

    await Game.bulkWrite(gamesData.map((game) => {
      return {
        updateOne: {
          filter: { id: game.id },
          update: game,
          upsert: true
        }
      }
    }))
  } catch (error) {
    consola.error('Failed to fetch games data')

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
  addGames
}
