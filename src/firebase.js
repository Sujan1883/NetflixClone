// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuM6Anso-9tx_Yj9KbMKmwwHHy-QEUEPU",
  authDomain: "netflix-clone-eff00.firebaseapp.com",
  projectId: "netflix-clone-eff00",
  storageBucket: "netflix-clone-eff00.appspot.com",
  messagingSenderId: "503443345287",
  appId: "1:503443345287:web:39a1425e8b19d975334d22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })
    }
    catch(error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email,password)=>{
    try{
        signInWithEmailAndPassword(auth,email,password);
    }
    catch(error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout =()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};