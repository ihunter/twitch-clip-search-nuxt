const moment = require('moment')
const consola = require('consola')

const {Broadcaster, Log } = require('../models')

const { fetchClips } = require('./jobs/fetchClips')

async function init () {
  let broadcasters
  try {
    broadcasters = await Broadcaster.find()
  } catch (error) {
    consola.error('Failed to get broadcasters')
    consola.error(error)
  }

  broadcasters.forEach(async broadcaster => {
    try {
      const weekLog = (await Log.findOrCreate({ type: 'week', broadcaster_id: broadcaster.id }, {
        started_at: moment.utc().startOf('day').subtract(1, 'week').toISOString(),
        ended_at: moment.utc().toISOString()
      })).doc

      const monthLog = (await Log.findOrCreate({ type: 'month', broadcaster_id: broadcaster.id }, {
        started_at: moment.utc().startOf('day').subtract(1, 'month').toISOString(),
        ended_at: moment.utc().toISOString()
      })).doc

      const yearLog = (await Log.findOrCreate({ type: 'year', broadcaster_id: broadcaster.id }, {
        started_at: moment.utc().startOf('day').subtract(1, 'year').toISOString(),
        ended_at: moment.utc().toISOString()
      })).doc

      const allLog = (await Log.findOrCreate({ type: 'all', broadcaster_id: broadcaster.id }, {
        started_at: moment.utc().startOf('day').subtract(1, 'all').toISOString(),
        ended_at: moment.utc().toISOString()
      })).doc
  
      const diffInMinutes = moment.utc().diff(moment.utc(weekLog.updated_at), 'minutes')
      const diffInDays = moment.utc().diff(moment.utc(monthLog.updated_at), 'days')
      const diffInWeeks = moment.utc().diff(moment.utc(yearLog.updated_at), 'weeks')
      const diffInMonths = moment.utc().diff(moment.utc(allLog.updated_at), 'months')
  
      const jobQueue = []
  
      if (diffInMinutes >= 5) {
        console.log('Fetching weeks clips')
        jobQueue.push(fetchClips('week'))
      }
      if (diffInDays >= 1) {
        console.log('Fetching months clips')
        jobQueue.push(fetchClips('month'))
      }
      if (diffInWeeks >= 1) {
        console.log('Fetching years clips')
        jobQueue.push(fetchClips('year'))
      }
      if (diffInMonths >= 1) {
        console.log('Fetching all clips')
        jobQueue.push(fetchClips('all'))
      }
  
      await Promise.all(jobQueue)
    } catch (error) {
      consola.error('Failed to init jobs')
      consola.error(error)
    }
  })
}

setInterval(init, 10000)
