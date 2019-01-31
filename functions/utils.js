const moment = require('moment')

const calculateRemainingHours = (hoursRemaining, startAtSeconds) => {
  const end = moment()
  const start = moment(startAtSeconds * 1000)
  const duration = moment.duration(end.diff(start))
  const durationInHours = duration.asSeconds() / (60 * 60)

  const resultRemaining = hoursRemaining - durationInHours

  console.log('calculate remaining hours', hoursRemaining, durationInHours, resultRemaining)
  return resultRemaining
}

module.exports = {
  calculateRemainingHours
}
