import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast,Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const firebaseConfig = {
    apiKey: "AIzaSyA1DaztHP5sDaD0xFLRODH6KT0jsj6jDv0",
  authDomain: "finrix-b254b.firebaseapp.com",
  projectId: "finrix-b254b",
  storageBucket: "finrix-b254b.appspot.com",
  messagingSenderId: "1006131754603",
  appId: "1:1006131754603:web:7c9255152142f3b7fce32e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.warning("Warning Notification !", {
        position: toast.POSITION.TOP_LEFT,
      });
  }
};


const logout = () => {
  signOut(auth);
};
export {
  auth,
  logInWithEmailAndPassword,
  logout,
};