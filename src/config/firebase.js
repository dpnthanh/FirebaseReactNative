import * as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyB2BtVW6EEwMYK2iFDdgi9wCRD3aK94DcM",
    authDomain: "demoreactnative-62f6d.firebaseapp.com",
    databaseURL: "https://demoreactnative-62f6d.firebaseio.com",
    projectId: "demoreactnative-62f6d",
    storageBucket: "demoreactnative-62f6d.appspot.com",
    messagingSenderId: "453988857611"
  };
export const Firebase = firebase.initializeApp(config);
