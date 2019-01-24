var admin = require("firebase-admin");
const moment = require('moment');
var serviceAccount = require("./coworking-checkin-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coworking-checkin.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);


const getHumanReadable = duration => {
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes())%60;
  if (hours === 0 && minutes === 0) {
    return 'a few seconds';
  }
  if (hours === 0) {
    return `${minutes} min`;
  }
  return `${hours} h and ${minutes} min`;
}

const db = {
  getTicketById(ticketId) {
    return firestore.collection('tickets').doc(ticketId).get();
  },

  getVisitorById(visitorId) {
    return firestore.collection('visitors').doc(visitorId).get();
  },

  doCheckIn( ticketSnapshot, visitorSnapshot ) {
    const newVisitRef = firestore.collection('visits').doc();
    const newVisit = {
      startAt: new Date(),
      visitorName: visitorSnapshot.data().firstName,  //todo: set ref to visitor id
      userId: ticketSnapshot.data().userId,
    };  
    firestore.collection('tickets').doc(ticketSnapshot.id).set({
      visitId: newVisitRef.id
    }, { merge: true });
    newVisitRef.set(newVisit);
    return Promise.resolve();
  },

  doCheckOut(ticketSnapshot) {
    return firestore.collection('visits').doc(ticketSnapshot.data().visitId).get()
      .then(visitSnapshot => {
        const endAt = new Date();
        const end = moment();
        const start = moment(visitSnapshot.data().startAt.seconds * 1000);
        const duration = moment.duration(end.diff(start));
        const minutes = duration.asMinutes();
        const humanReadable = getHumanReadable(duration);
  
        return firestore.collection('visits').doc(ticketSnapshot.data().visitId).set({
          endAt
        }, { merge: true }).then( () => {
          return firestore.collection('tickets').doc(ticketSnapshot.id).set({
            visitId: null
        }, { merge: true }).then( () => {
            return humanReadable;
          } );
        } );
      });
  },

  toggleCheckin(ticketId) {
    return db.getTicketById(ticketId).then(ticketSnapshot => { 
      if (!ticketSnapshot.exists) {
        return Promise.resolve('❌ No such ticket');
      }
      return db.getVisitorById(ticketSnapshot.data().visitorId).then( visitorSnapshot => {
        if (ticketSnapshot.data().visitId) {
          return db.doCheckOut(ticketSnapshot).then((time) => {
            const message = `👋 ${time}`;
            return Promise.resolve(message);
          });
        }
        return db.doCheckIn(ticketSnapshot, visitorSnapshot).then(() => {
          const message = `✅ Hello, ${visitorSnapshot.data().firstName}`;
          return Promise.resolve(message);
        });
      })
    }).catch(err => console.log(err))
  }
}

module.exports = {
  db,
  firestore
};
