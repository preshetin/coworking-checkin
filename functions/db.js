var admin = require('firebase-admin')
const moment = require('moment')
var serviceAccount = require('./coworking-checkin-firebase-adminsdk.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coworking-checkin.firebaseio.com'
})
const firestore = admin.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true }
firestore.settings(settings)
const calculateRemainingHours = require('./utils').calculateRemainingHours
const durationForHumans = require('./utils').durationForHumans
const hoursRemainingFormatted = require('./utils').hoursRemainingFormatted

const db = {
  getTicketById (ticketId) {
    return firestore.collection('tickets').doc(ticketId).get()
  },

  getVisitorById (visitorId) {
    return firestore.collection('visitors').doc(visitorId).get()
  },

  doCheckIn (ticketSnapshot, visitorSnapshot) {
    const newVisitRef = firestore.collection('visits').doc()
    const newVisit = {
      startAt: new Date(),
      visitorName: visitorSnapshot.data().firstName, // todo: set ref to visitor id
      userId: ticketSnapshot.data().userId
    }
    firestore.collection('tickets').doc(ticketSnapshot.id).set({
      visitId: newVisitRef.id
    }, { merge: true })
    newVisitRef.set(newVisit)
    return Promise.resolve()
  },

  doCheckOut (ticketSnapshot) {
    return firestore.collection('visits').doc(ticketSnapshot.data().visitId).get()
      .then(visitSnapshot => {
        const endAt = new Date()
        const end = moment()
        const startAtSeconds = visitSnapshot.data().startAt.seconds
        const start = moment(startAtSeconds * 1000)
        const duration = moment.duration(end.diff(start))
        const visitLasted = durationForHumans(duration)

        firestore.collection('visits').doc(ticketSnapshot.data().visitId).set({
          endAt
        }, { merge: true })
        return Promise.resolve({ startAtSeconds, visitLasted })
      })
      .then(({ startAtSeconds, visitLasted }) => {
        const hoursRemaining = ticketSnapshot.data().hoursRemaining
        const newRemainingHours = calculateRemainingHours(hoursRemaining, startAtSeconds)
        firestore.collection('tickets').doc(ticketSnapshot.id).set({
          hoursRemaining: newRemainingHours,
          visitId: null
        }, { merge: true })
        const remainingFormatted = hoursRemainingFormatted(newRemainingHours)
        const resultStr = `You visit lasted ${visitLasted}. ${remainingFormatted} remaining`
        return Promise.resolve(resultStr)
      })
      .then(visitLasted => {
        // add remaining hours to message
        return visitLasted
      })
  },

  toggleCheckin (ticketId) {
    return db.getTicketById(ticketId).then(ticketSnapshot => {
      if (!ticketSnapshot.exists) {
        return Promise.resolve('❌ No such ticket')
      }
      return db.getVisitorById(ticketSnapshot.data().visitorId).then(visitorSnapshot => {
        if (ticketSnapshot.data().visitId) {
          return db.doCheckOut(ticketSnapshot).then((checkoutMessage) => {
            const message = `👋 ${checkoutMessage}`
            return Promise.resolve(message)
          })
        }
        return db.doCheckIn(ticketSnapshot, visitorSnapshot).then(() => {
          const message = `✅ Hello, ${visitorSnapshot.data().firstName}`
          return Promise.resolve(message)
        })
      })
    }).catch(err => console.log(err))
  }
}

module.exports = {
  db,
  firestore
}
