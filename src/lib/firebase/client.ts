// This file is a placeholder for your Firebase client configuration.
// For the app to work, you need to set up a Firebase project and
// fill in the environment variables in a .env.local file.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'your-api-key',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'your-auth-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'your-storage-bucket',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    'your-messaging-sender-id',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'your-app-id',
};

// NOTE: In a real app, you would initialize Firebase here:
// import { initializeApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// let app;
// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
// }

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// For this mock implementation, we export a dummy object.
export const auth = {};
export const db = {};
