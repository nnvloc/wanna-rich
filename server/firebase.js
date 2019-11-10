const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./rich-kid-4a238-firebase-adminsdk-d9s11-d89b9bcbc4.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://rich-kid-4a238.firebaseio.com"
});

const db = firebaseAdmin.database();

module.exports.db = db;