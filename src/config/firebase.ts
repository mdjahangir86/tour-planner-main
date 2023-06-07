import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const { REACT_APP_FB_API, REACT_APP_FB_APP_ID, REACT_APP_FB_MSG_ID } =
  process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FB_API,
  authDomain: 'tour-planner-bd.firebaseapp.com',
  projectId: 'tour-planner-bd',
  storageBucket: 'tour-planner-bd.appspot.com',
  messagingSenderId: REACT_APP_FB_MSG_ID,
  appId: REACT_APP_FB_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const logOut = signOut;

export default app;
