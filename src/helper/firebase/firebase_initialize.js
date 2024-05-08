// Modules
const { initializeApp } = require('firebase/app');

// Config
const config = require('../../config/config');

// Firebase Config
const firebaseConfig = {
     apiKey: config.firebase.apiKey,
     authDomain: config.firebase.authDomain,
     projectId: config.firebase.projectId,
     storageBucket: config.firebase.storageBucket,
     messagingSenderId: config.firebase.messagingSenderId,
     appId: config.firebase.appId,
     measurementId: config.firebase.measurementId,
};

// Initialize Firebase app
const fireApp = initializeApp(firebaseConfig);


module.exports = {
     fireApp
}