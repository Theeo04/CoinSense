import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG-CDnMw9SATq8jLSYt97TELmB7GifSyE",
  authDomain: "cryptoapp-3e496.firebaseapp.com",
  projectId: "cryptoapp-3e496",
  storageBucket: "cryptoapp-3e496.appspot.com",
  messagingSenderId: "336029212728",
  appId: "1:336029212728:web:6539e71622c8c413e186cd",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, db, storage };
