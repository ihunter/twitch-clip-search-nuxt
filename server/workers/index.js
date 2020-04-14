const moment = require('moment')

const { Log } = require('../models')

const { fetchClips } = require('./jobs/fetchClips')

async function init () {
  try {
    const weekLog = (await Log.find({ type: 'week' }).sort('updated_at'))[0]
    const monthLog = (await Log.find({ type: 'month' }).sort('updated_at'))[0]
    const yearLog = (await Log.find({ type: 'year' }).sort('updated_at'))[0]
    const allLog = (await Log.find({ type: 'all' }).sort('updated_at'))[0]

    const diffInMinutes = moment.utc().diff(moment.utc(weekLog.updated_at), 'minutes')
    const diffInDays = moment.utc().diff(moment.utc(monthLog.updated_at), 'days')
    const diffInWeeks = moment.utc().diff(moment.utc(yearLog.updated_at), 'weeks')
    const diffInMonths = moment.utc().diff(moment.utc(allLog.updated_at), 'months')

    const jobQueue = []

    if (diffInMinutes >= 5) {
      jobQueue.push(fetchClips('week'))
    }
    if (diffInDays >= 1) {
      jobQueue.push(fetchClips('month'))
    }
    if (diffInWeeks >= 1) {
      jobQueue.push(fetchClips('year'))
    }
    if (diffInMonths >= 1) {
      jobQueue.push(fetchClips('all'))
    }

    await Promise.all(jobQueue)
  } catch (error) {
    console.error('Failed to init jobs')
    console.log(error)
  }
}

setInterval(init, 10000)
