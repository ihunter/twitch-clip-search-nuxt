const moment = require('moment')
const consola = require('consola')

const { Broadcaster, Log } = require('../models')

const { fetchClips } = require('./jobs/fetchClips')

const stateManager = {
  week: false,
  month: false,
  year: false,
  all: false
}

async function init() {
  let broadcasters
  console.log(stateManager)
  try {
    broadcasters = await Broadcaster.find()
  } catch (error) {
    consola.error('Failed to get broadcasters')
    consola.error(error)
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

      if (((moment.utc().diff(moment.utc(weekLog.updated_at), 'minutes') >= 0) || weekLog.progress === 'in-progress') && !stateManager.week) {
        jobQueue.push(fetchClips('week', broadcaster, stateManager))
      }

      if (((moment.utc().diff(moment.utc(monthLog.updated_at), 'hours') >= 0) || weekLog.progress === 'in-progress') && !stateManager.month) {
        jobQueue.push(fetchClips('month', broadcaster, stateManager))
      }

      if (((moment.utc().diff(moment.utc(yearLog.updated_at), 'hours') >= 0) || weekLog.progress === 'in-progress') && !stateManager.year) {
        jobQueue.push(fetchClips('year', broadcaster, stateManager))
      }

      if (((moment.utc().diff(moment.utc(allLog.updated_at), 'day') >= 0) || weekLog.progress === 'in-progress') && !stateManager.all) {
        jobQueue.push(fetchClips('all', broadcaster, stateManager))
      }

      await Promise.all(jobQueue)
    } catch (error) {
      consola.error('Failed to init jobs')
      consola.error(error)
    }
  })
}

init()
setInterval(init, 2000)
