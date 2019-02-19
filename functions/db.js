var admin = require('firebase-admin')
const moment = require('moment')
var serviceAccount = require('./coworking-checkin-firebase-adminsdk.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coworking-checkin.firebaseio.com'
})
const firestore = admin.firestore()
const settings = { timestampsInSnapshots: true }
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

  createVisitor (request) {
    const newVisitorRef = firestore.collection('visitors').doc()
    const visitorData = {
      ...request,
      createdAt: new Date()
    }
    return newVisitorRef.set(visitorData).then(() => {
      // todo: send email with visitor id barcode

      return {
        visitorData,
        visitorId: newVisitorRef.id
      }
    })
  },

  makeVisitDurationCalculations (visitorSnapshot) {
    return firestore.collection('visits').doc(visitorSnapshot.data().activeVisitId).get()
      .then(visitSnapshot => {
        const endAt = new Date()
        const end = moment()
        const startAtSeconds = visitSnapshot.data().startAt.seconds
        const start = moment(startAtSeconds * 1000)
        const duration = moment.duration(end.diff(start))
        const visitLasted = durationForHumans(duration)
        firestore.collection('visits').doc(visitorSnapshot.data().activeVisitId).set({
          endAt
        }, { merge: true })
        return Promise.resolve({ startAtSeconds, visitLasted })
      })
  },

  handleReturningVisitor (visitorSnapshot, hoursAmount, visitLasted) {
    firestore.collection('visitors').doc(visitorSnapshot.id).set({
      hoursAmount,
      activeVisitId: null
    }, { merge: true })
    const remainingFormatted = hoursRemainingFormatted(hoursAmount)
    return `${visitLasted}. ${remainingFormatted} осталось`
  },

  handleOneTimeVisitor (visitorSnapshot, hoursAmount, visitLasted) {
    firestore.collection('visitors').doc(visitorSnapshot.id).set({
      activeVisitId: null
    }, { merge: true })
    return `${visitLasted} длился ваш визит. Оплатите на кассе`
  },

  doCheckIn (visitorData, visitorId) {
    const newVisitRef = firestore.collection('visits').doc()
    const newVisit = {
      startAt: new Date(),
      visitorName: visitorData.firstName + ' ' + visitorData.lastName, // todo: set ref to visitor id
      visitorId,
      userId: visitorData.userId
    }
    firestore.collection('visitors').doc(visitorId).set({
      activeVisitId: newVisitRef.id
    }, { merge: true })
    newVisitRef.set(newVisit)
    return Promise.resolve()
  },

  doCheckOut (visitorSnapshot) {
    return this.makeVisitDurationCalculations(visitorSnapshot)
      .then(({ startAtSeconds, visitLasted }) => {
        const hoursRemaining = visitorSnapshot.data().hoursAmount
        const newRemainingHours = calculateRemainingHours(hoursRemaining, startAtSeconds)

        let resultStr
        if (visitorSnapshot.data().hoursAmount) {
          resultStr = this.handleReturningVisitor(visitorSnapshot, newRemainingHours, visitLasted)
        } else {
          resultStr = this.handleOneTimeVisitor(visitorSnapshot, newRemainingHours, visitLasted)
        }
        return Promise.resolve(resultStr)
      })
      .then(visitLasted => {
        // add remaining hours to message
        return visitLasted
      })
  },

  toggleCheckin (visitorId) {
    return db.getVisitorById(visitorId).then(visitorSnapshot => {
      if (!visitorSnapshot.exists) {
        return Promise.resolve('❌ No such visitor')
      }
      if (visitorSnapshot.data().activeVisitId) {
        return db.doCheckOut(visitorSnapshot).then((checkoutMessage) => {
          const message = `👋 ${checkoutMessage}`
          return Promise.resolve(message)
        })
      }
      return db.doCheckIn(visitorSnapshot.data(), visitorSnapshot.id).then(() => {
        const message = `✅ Hello, ${visitorSnapshot.data().firstName}`
        return Promise.resolve(message)
      })
    }).catch(err => console.log(err))
  }
}

module.exports = {
  db,
  firestore
}
