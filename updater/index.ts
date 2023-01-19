import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  QuerySnapshot,
  DocumentData,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { Parser } from "./AST/Parser";
import { Compiler } from "./AST/Compiler";
import { compileAndFormat } from "./compileAndFormat";
import { exec } from "child_process";

const firebaseConfig = {
  apiKey: "AIzaSyAGCiyuAIPoC4FWwyp7GTeO7X22q6bwpdY",
  authDomain: "dappml-editor.firebaseapp.com",
  projectId: "dappml-editor",
  storageBucket: "dappml-editor.appspot.com",
  messagingSenderId: "816974481917",
  appId: "1:816974481917:web:7fe115f9acd6a6699e3194",
  measurementId: "G-XCE0K6L874",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function start() {
  try {
    if (!process.env.DOC_ID) throw new Error("DOC_ID is not defined");
    if (!process.env.USER_ID) throw new Error("USER_ID is not defined");

    const devServer = exec("npm start", { cwd: "./template-project" });

    const serverUser = await signInWithEmailAndPassword(auth, "updater@updater.com", "updater_updater");
    const db = getFirestore(app);
    const docRef = doc(db, process.env.USER_ID, process.env.DOC_ID);
    const project = await getDoc(docRef);
    console.log(project.data());
    onSnapshot(docRef, (doc) => {
      console.log("updating document");
      compileAndFormat(doc.data().dappml);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
