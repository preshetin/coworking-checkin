import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    this.firestore.settings(settings);

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  //user = uid => this.db.ref(`users/${uid}`);
  user = uid => this.firestore.collection(`users`).doc(uid);

  // users = () => this.db.ref('users');
  users = () => this.firestore.collection('users');

  // *** Message API ***

  //  message = uid => this.db.ref(`messages/${uid}`);
  message = uid => this.firestore.collection('messages').doc(uid);
  
  //  messages = () => this.db.ref('messages');
  messages = () => this.firestore.collection('messages');
  
  // *** Ticket API ***

  ticket = uid => this.firestore.collection('tickets').doc(uid);
  
  tickets = () => this.firestore.collection('tickets');

  ticketsForUser = (uid) => this.firestore.collection('tickets')
    .where('userId', '==', uid);

  ticketWithVisit = visitId => {
    return this.firestore.collection('tickets')
      .where('visitId', '==', visitId).get().then(querySnapshot => {
        if (querySnapshot.docs.length) {
          return querySnapshot.docs[0];
        } else {
          return null;
        }
      });
  }

  // *** Visitors API **

  visitorsForUser = uid => this.firestore.collection('visitors')
    .where('userId', '==', uid);

  visitor = id => this.firestore.collection('visitors').doc(id);

  // *** Visit API ***

  visit = uid => this.firestore.collection('visits').doc(uid);
  
  visits = () => this.firestore.collection('visits');

  visitsForUser = (uid) => this.firestore.collection('visits')
    .where('userId', '==', uid);

  createVisit = visit => this.firestore.collection('visits').add(visit);

  checkoutVisit = (visit) => {
    return this.ticketWithVisit(visit.uid).then(ticketSnapshot => {
      if ( ticketSnapshot) {
        return this.ticket(ticketSnapshot.id).set({
          visitId: null
        }, { merge: true }).then( () => {
          return this.firestore.collection('visits')
              .doc(visit.uid).set({ endAt: visit.endAt }, { merge: true })
        })
      } else {
        return this.firestore.collection('visits')
            .doc(visit.uid).set({ endAt: visit.endAt }, { merge: true })
      }
    })
  }

}

export default Firebase;
