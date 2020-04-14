require('dotenv').config()
const axios = require('axios')

const { Credential } = require('../models')

exports.API = async () => {
  const cred = await Credential.findOne()
  return axios.create({
    baseURL: process.env.TWITCH_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${cred.access_token}`,
      'Client-ID': process.env.TWITCH_CLIENT_ID
    }
  })
}
