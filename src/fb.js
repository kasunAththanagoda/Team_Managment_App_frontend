// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore} from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp90MQCw0Lm7xGM5mwn1jBHCTbt3tCoeY",
  authDomain: "todo-8fed0.firebaseapp.com",
  projectId: "todo-8fed0",
  storageBucket: "todo-8fed0.appspot.com",
  messagingSenderId: "577443891083",
  appId: "1:577443891083:web:966d97ec53a918c923518e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default db;