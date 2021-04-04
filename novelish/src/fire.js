import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyArrssFDjyLRFo84AR1MQaJWbTgUatEn-Q",
  authDomain: "novelish-app-579.firebaseapp.com",
  databaseURL: "https://novelish-app-579-default-rtdb.firebaseio.com",
  projectId: "novelish-app-579",
  storageBucket: "novelish-app-579.appspot.com",
  messagingSenderId: "340925365806",
  appId: "1:340925365806:web:206151ecdeeee43b15e9bf"
};

var fire = firebase.initializeApp(firebaseConfig)
export default fire