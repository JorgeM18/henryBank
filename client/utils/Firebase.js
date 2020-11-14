
import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCkP6CM8pOsThzg9ETo_w6N5QH5kMdTFFE",
    authDomain: "serverimages-2f68f.firebaseapp.com",
    databaseURL: "https://serverimages-2f68f.firebaseio.com",
    projectId: "serverimages-2f68f",
    storageBucket: "serverimages-2f68f.appspot.com",
    messagingSenderId: "538765802597",
    appId: "1:538765802597:web:5ed29aeb39bb9baed41a8c"
  };

// if(!firebase.app.length){
//     firebase.initializeApp(firebaseConfig)
// }
!firebase.apps.length? firebase.initializeApp(firebaseConfig) : firebase.app()

// firebase.initializeApp(firebaseConfig)
  // firebase.firestore();
  export default firebase;