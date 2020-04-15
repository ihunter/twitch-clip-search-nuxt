const axios = require('axios')
const consola = require('consola')

const { Credential } = require('../../models')

exports.getAuthToken = async () => {
  try {
    const clientID = process.env.TWITCH_CLIENT_ID
    const clientSecret = process.env.TWITCH_CLIENT_SECRET

    const res = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`)

    const cred = res.data

    await Credential.findOneAndUpdate(null, cred, { upsert: true })
  } catch (error) {
    consola.error('Faild to get access token')
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
