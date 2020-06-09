import firebase from 'firebase/app';                                       // eslint-disable-next-line
import firestore from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyClaAkpUCPvvL3Txw0jtQPbZwag0EnHTEo",
    authDomain: "new-age-custom-payment.firebaseapp.com",
    databaseURL: "https://new-age-custom-payment.firebaseio.com",
    projectId: "new-age-custom-payment",
    storageBucket: "new-age-custom-payment.appspot.com",
    messagingSenderId: "1014875466152",
    appId: "1:1014875466152:web:750eb5992b794ca48fd59d"
};

firebase.initializeApp(config);

firebase.firestore();

export default firebase;