
export const getHumanReadableDuration = duration => {
  var hours = parseInt(duration.asHours())
  var minutes = parseInt(duration.asMinutes()) % 60
  var seconds = parseInt(duration.seconds())
  if (hours === 0 && minutes === 0) {
    return `${seconds} sec`
    return 'less than a minute'
  }
  if (hours === 0) {
    return `${minutes} min ${seconds} sec`
  }
  return `${hours} h ${minutes} min ${seconds} sec`
}
