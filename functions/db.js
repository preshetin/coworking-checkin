var admin = require("firebase-admin");
var serviceAccount = require("./coworking-checkin-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coworking-checkin.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

const db = {
  getTicketById(ticketId) {
    return firestore.collection('tickets').doc(ticketId).get();
  }
}

module.exports = {
  db,
  firestore
};
