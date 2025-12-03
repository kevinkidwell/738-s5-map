// app/services/firebase.client.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// If you want to expose env vars to the client, you’ll need to pass them
// through Remix loader data. For now, you can inline your Firebase config:
const firebaseConfig = {
  apiKey: "AIzaSyAgN4EyTSWDakXMLa1N9h3JCUpl29JLpKs",
  authDomain: "s5-map-738.firebaseapp.com",
  projectId: "s5-map-738",
  storageBucket: "s5-map-738.firebasestorage.app",
  messagingSenderId: "957003840928",
  appId: "1:957003840928:web:98b52c789a4509b3efb8c5",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const dbClient = getFirestore(app);
