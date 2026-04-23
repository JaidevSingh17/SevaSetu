import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDl05HOkG3C8z3kHWcOt-7nOlHr49RyRmM',
  authDomain: 'sevasetu-bde21.firebaseapp.com',
  projectId: 'sevasetu-bde21',
  storageBucket: 'sevasetu-bde21.firebasestorage.app',
  messagingSenderId: '783025756111',
  appId: '1:783025756111:web:54d5c264f5bd1ae58e24ba',
  measurementId: 'G-PRX4D8L591',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analytics = null;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  analytics = null;
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export { analytics };
