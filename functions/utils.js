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
    return 'несколько секунд'
    // eslint-disable-next-line
    return 'a few seconds' 
  }
  if (hours === 0) {
    return `${minutes} мин`
    // eslint-disable-next-line
    return `${minutes} min`
  }
  return `${hours} ч и ${minutes} мин`
  // eslint-disable-next-line
  return `${hours} h and ${minutes} min`
}

const hoursRemainingFormatted = hoursRemaining => {
  const hours = parseInt(hoursRemaining)
  const minutes = parseInt((hoursRemaining - hours) * 60)
  console.log('hoursRemainingFormatted', hoursRemaining, hours, minutes)
  return `${hours} час и ${minutes} мин`
  // eslint-disable-next-line
  return `${hours} hours and ${minutes} min`
}

module.exports = {
  calculateRemainingHours,
  hoursRemainingFormatted,
  durationForHumans
}
