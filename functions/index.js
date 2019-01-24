const functions = require('firebase-functions');
const db = require('./db').db;

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.handleQRCode = functions.https.onRequest((request, response) => {

  const ticketId = request.query.ticketId;

  db.toggleCheckin(ticketId).then(message => {
    response.send(message);
    return Promise.resolve();
  })
  .catch(err => console.log(err));


  // check if ticket id exists
  //
// response.send("Hello from Firebase!" + ticketId);
});


