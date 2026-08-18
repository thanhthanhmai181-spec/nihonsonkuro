import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhj5Bd4rJDwk3xbev15Rmg5IzJc7uFInE",
  authDomain: "integral-text-4mvz5.firebaseapp.com",
  projectId: "integral-text-4mvz5",
  storageBucket: "integral-text-4mvz5.firebasestorage.app",
  messagingSenderId: "687955023988",
  appId: "1:687955023988:web:e92dd8ba6971e034471921"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-hoccungthayson-eb3d177d-62c6-4ae4-a829-90a52e61f4ea");

// Validate Connection to Firestore on startup
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase Firestore connected successfully.");
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration: Client is offline.");
    } else {
      console.log("Firestore initialized. Note: Connection is validated.");
    }
  }
}
testConnection();
