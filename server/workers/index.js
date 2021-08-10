const moment = require('moment')

const { Broadcaster, Log } = require('../models')

const { addClips } = require('./jobs/addClips')

const THIRTY_SECONDS = 30 * 1000

const stateManager = {
  week: false,
  month: false,
  year: false,
  all: false
}

async function init() {
  let broadcasters
  try {
    broadcasters = await Broadcaster.find()
  } catch (error) {
    console.error('Failed to get broadcasters')
    console.error(error)
  }

  broadcasters.forEach(async broadcaster => {
    try {
      const weekLog = (await Log.findOrCreate({ type: 'week', broadcaster_id: broadcaster.id }, {
        updated_at: moment.utc().subtract(1, 'year')
      })).doc

      const monthLog = (await Log.findOrCreate({ type: 'month', broadcaster_id: broadcaster.id }, {
        updated_at: moment.utc().subtract(1, 'year')
      })).doc

      const yearLog = (await Log.findOrCreate({ type: 'year', broadcaster_id: broadcaster.id }, {
        updated_at: moment.utc().subtract(1, 'year')
      })).doc

      const allLog = (await Log.findOrCreate({ type: 'all', broadcaster_id: broadcaster.id }, {
        updated_at: moment.utc().subtract(1, 'year')
      })).doc

      const jobQueue = []

      if (((moment.utc().diff(moment.utc(weekLog.updated_at), 'minutes') >= 2) || weekLog.progress === 'in-progress') && !stateManager.week) {
        jobQueue.push(addClips('week', broadcaster, stateManager))
      }

      if (((moment.utc().diff(moment.utc(monthLog.updated_at), 'hours') >= 1) || monthLog.progress === 'in-progress') && !stateManager.month) {
        jobQueue.push(addClips('month', broadcaster, stateManager))
      }

      if (((moment.utc().diff(moment.utc(yearLog.updated_at), 'hours') >= 3) || yearLog.progress === 'in-progress') && !stateManager.year) {
        jobQueue.push(addClips('year', broadcaster, stateManager))
      }

      if (((moment.utc().diff(moment.utc(allLog.updated_at), 'day') >= 6) || allLog.progress === 'in-progress') && !stateManager.all) {
        jobQueue.push(addClips('all', broadcaster, stateManager))
      }

      await Promise.all(jobQueue)
    } catch (error) {
      console.error('Failed to init jobs')
      console.error(error)
    }
  })
}

init()
setInterval(init, THIRTY_SECONDS)
