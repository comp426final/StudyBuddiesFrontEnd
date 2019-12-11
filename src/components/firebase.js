import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB6IV9Aume-VIscucb2cvFAGbMO0paYjTQ",
  authDomain: "study-buddies-73972.firebaseapp.com",
  databaseURL: "https://study-buddies-73972.firebaseio.com",
  projectId: "study-buddies-73972",
  storageBucket: "study-buddies-73972.appspot.com",
  messagingSenderId: "678592520237",
  appId: "1:678592520237:web:0aae7d7170d42a4ffc18a4",
  measurementId: "G-3Y2TQEW7K3"
};

firebase.initializeApp(config);

const database = firebase.database();

export {
  database,
};