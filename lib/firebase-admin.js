import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: process.env.FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://auto-scraper-ad597.firebaseio.com'
  });
}
const auth = admin.auth();
const db = admin.firestore();
export { auth, db };