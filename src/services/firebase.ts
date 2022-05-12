import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAVqdsPG3vGPXcr-lGbJzbUoIodx_tvndk",
  authDomain: "letmeask-86b47.firebaseapp.com",
  databaseURL: "https://letmeask-86b47-default-rtdb.firebaseio.com",
  projectId: "letmeask-86b47",
  storageBucket: "letmeask-86b47.appspot.com",
  messagingSenderId: "1043645508045",
  appId: "1:1043645508045:web:46add6843ed613f84ffc84"
};

firebase.initializeApp(firebaseConfig)

 const auth = firebase.auth()
 const database = firebase.database()

 export {firebase, auth, database}


 