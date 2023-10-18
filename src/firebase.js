import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDAptxAbYFYVEnP8MwYqivQYwvZYA6pFYo',
  authDomain: 'blog-website-dc8e8.firebaseapp.com',
  projectId: 'blog-website-dc8e8',
  storageBucket: 'blog-website-dc8e8.appspot.com',
  messagingSenderId: '553937013135',
  appId: '1:553937013135:web:80cbececc4a924842ca3fa',
  measurementId: 'G-VPVF3KZY2L',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

// npm install -g firebase-tools
