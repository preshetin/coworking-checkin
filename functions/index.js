const functions = require('firebase-functions');
const db = require('./db').db;

exports.handleQRCode = functions.https.onRequest((request, response) => {

  const ticketId = request.query.ticketId;

  db.toggleCheckin(ticketId).then(message => {
    response.send(message);
    return Promise.resolve();
  })
  .catch(err => console.log(err));
});


