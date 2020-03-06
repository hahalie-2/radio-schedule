import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCWa8_zx2-ISJKz1Bp4uFsKYoaSGNYem6c",
    authDomain: "radio-2-1fb64.firebaseapp.com",
    databaseURL: "https://radio-2-1fb64.firebaseio.com",
    projectId: "radio-2-1fb64",
    storageBucket: "radio-2-1fb64.appspot.com",
    messagingSenderId: "161388351916"
  };
  var ReplayDB = firebase.initializeApp(config);
  ReplayDB.firestore().settings({ timestampsInSnapshots : true })

  export default ReplayDB


  