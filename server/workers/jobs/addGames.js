require('dotenv').config()

const { Clip, Game } = require('../../models')

const { http } = require('../../utils/twitch-api')
const errorHandler = require('../../utils/axios-error-handling')

async function addGames() {
  try {
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
      const res = await http.get(`games?id=${gameIDs}`)
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
    console.error('Failed to fetch games data')

    errorHandler(error)
  }
}

module.exports = {
  addGames
}
