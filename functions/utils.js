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

const durationForHumans = duration => {
  var hours = parseInt(duration.asHours())
  var minutes = parseInt(duration.asMinutes()) % 60
  if (hours === 0 && minutes === 0) {
    return 'a few seconds'
  }
  if (hours === 0) {
    return `${minutes} min`
  }
  return `${hours} h and ${minutes} min`
}

const hoursRemainingFormatted = hoursRemaining => {
  const hours = parseInt(hoursRemaining)
  const minutes = parseInt((hoursRemaining - hours) * 60)
  console.log('hoursRemainingFormatted', hoursRemaining, hours, minutes)
  return `${hours} hours and ${minutes} min`
}

module.exports = {
  calculateRemainingHours,
  hoursRemainingFormatted,
  durationForHumans
}
