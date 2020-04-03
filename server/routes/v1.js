const express = require('express')
const router = express.Router()

const clipsController = require('../controllers/clipsController')

router.get('/clips', clipsController.get)

module.exports = router
