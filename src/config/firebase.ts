import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const { REACT_APP_FB_API, REACT_APP_FB_APP_ID, REACT_APP_FB_MSG_ID } =
  process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FB_API,
  authDomain: 'tourism-a323b.firebaseapp.com',
  projectId: 'tourism-a323b',
  storageBucket: 'tourism-a323b.appspot.com',
  messagingSenderId: REACT_APP_FB_MSG_ID,
  appId: REACT_APP_FB_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const logOut = signOut;

export default app;
