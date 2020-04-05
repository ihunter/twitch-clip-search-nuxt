const mongoose = require('mongoose')
const Schema = mongoose.Schema

const credentialSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  expires_in: {
    type: Number,
    required: true
  },
  token_type: {
    type: String,
    required: true
  }
})

module.exports.Credential = mongoose.model('Credential', credentialSchema)
