require('dotenv').config()
const axios = require('axios')
const rateLimit = require('axios-rate-limit')

const twitchApi = rateLimit(axios.create({
  baseURL: process.env.TWITCH_API_BASE_URL,
  headers: {
    'Client-ID': process.env.TWITCH_CLIENT_ID
  }
}), { maxRPS: process.env.MAX_RPS || 13 })


// Add a response interceptor
twitchApi.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  if (error.response.status === 401) {
    const token = await getAuthToken()
    twitchApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return twitchApi(error.config)
  }

  return Promise.reject(error)
})

async function getAuthToken() {
  try {
    const { data } = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)

    return data.access_token

  } catch (error) {
    console.error(error.response.data)
  }
}

exports.http = twitchApi