// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'cms-ticket-sale-abb98.firebaseapp.com',
  projectId: 'cms-ticket-sale-abb98',
  storageBucket: 'cms-ticket-sale-abb98.appspot.com',
  messagingSenderId: '625532458145',
  appId: '1:625532458145:web:07ded5fc6a231aacfbcce0',
  measurementId: 'G-KXTQ91F51G'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
