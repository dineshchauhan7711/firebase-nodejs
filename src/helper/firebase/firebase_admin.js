const admin = require("firebase-admin");

const serviceAccount = require("../../config/serviceAccountKey.json");
const config = require("../../config/config");

admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: config.firebase.databaseURL
});

module.exports = admin;