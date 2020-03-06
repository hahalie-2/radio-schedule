import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyA98wqNZUPHpK6h8lesy8oOzINsXz0DHno",
  authDomain: "radio-7fb88.firebaseapp.com",
  databaseURL: "https://radio-7fb88.firebaseio.com",
  projectId: "radio-7fb88",
  storageBucket: "radio-7fb88.appspot.com",
  messagingSenderId: "336970880673"
};
var PlayDB = firebase.initializeApp(config);
PlayDB.firestore()
//PlayDB.firestore().settings({ timestampsInSnapshots : true })

export default PlayDB