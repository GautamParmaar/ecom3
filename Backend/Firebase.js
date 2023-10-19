const {initializeApp}=require('firebase/app')
const {getAuth}=require('firebase/auth')
const {getFirestore}=require('firebase/firestore')
const {getStorage}=require('firebase/storage')

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };

  const fb = initializeApp(firebaseConfig);

const auth=getAuth();
const db = getFirestore(fb);
const storage = getStorage(fb);


module.exports=(
    auth,db,storage,fb
)