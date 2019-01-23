const functions = require('firebase-functions');
const db = require('./db').db;


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.toggleCheckin = functions.https.onRequest((request, response) => {

  const ticketId = request.query.ticketId;


  db.getTicketById(ticketId).then(docSnapshot => {
    if (docSnapshot.exists) {
      response.send('ticket exists!' + JSON.stringify(docSnapshot.data()));
    } else {
      response.send('no such ticket id');
    }
    return Promise.resolve();
  }).catch(err => console.log(err))

  // check if ticket id exists
  //
// response.send("Hello from Firebase!" + ticketId);
});


