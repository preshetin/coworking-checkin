const functions = require('firebase-functions')
const db = require('./db').db

exports.handleQRCode = functions.https.onRequest((request, response) => {
  const visitorId = request.query.visitorId

  db.toggleCheckin(visitorId).then(message => {
    response.send(message)
    return Promise.resolve()
  })
    .catch(err => console.log(err))
})

exports.createVisitorAndCheckin = functions.https.onRequest((request, responce) => {
  const visitorRequest = request.body
  try {
    return db.createVisitor(visitorRequest).then(({ visitorData, visitorId }) => {
      return db.doCheckIn(visitorData, visitorId).then(() => {
        const message = `✅ Добро пожаловать, ${visitorData.firstName}`
        // const message = `✅ Hello, ${visitorData.firstName}`
        responce.send({
          ok: true,
          message,
          visitor: {
            ...visitorData,
            id: visitorId
          }
        })
        return Promise.resolve()
      })
    })
  } catch (error) {
    responce.send({ error })
  }
})
