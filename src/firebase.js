// firebase.js
// These values come from your Firebase Console → Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyAgN4EyTSWDakXMLa1N9h3JCUpl29JLpKs",
  authDomain: "s5-map-738.firebaseapp.com",
  projectId: "s5-map-738",
  storageBucket: "s5-map-738.firebasestorage.app",
  messagingSenderId: "957003840928",
  appId: "1:957003840928:web:98b52c789a4509b3efb8c5"

};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firestore instance
export const db = firebase.firestore();
