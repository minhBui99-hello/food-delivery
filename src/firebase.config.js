import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDj_ZAwMlivbAf5kJRcEZZLREJzHsVmFGQ",
    authDomain: "restaurantapp-de2c6.firebaseapp.com",
    databaseURL: "https://restaurantapp-de2c6-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-de2c6",
    storageBucket: "restaurantapp-de2c6.appspot.com",
    messagingSenderId: "1047327733974",
    appId: "1:1047327733974:web:f1f0f164cb5b2701813177",
    measurementId: "G-6QZ974W60N"
  };

const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);
const firestore =  getFirestore(app)
const storage = getStorage(app)
// const analytics = getAnalytics(app);

export {app, firestore, storage} ;