import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

import { Message } from "types";

const firebaseConfig = {
  apiKey: "AIzaSyAvxhAPrJAzWR7CirEVLR11gjzGTEUmCos",
  authDomain: "superkassatest-fa560.firebaseapp.com",
  projectId: "superkassatest-fa560",
  storageBucket: "superkassatest-fa560.appspot.com",
  messagingSenderId: "467071067116",
  appId: "1:467071067116:web:3a0122ef1f27323bf856c9"
};

initializeApp(firebaseConfig);

export const db = getFirestore();

export async function getMessagesData () {
  if (db) {
    const messagesRef = collection(db, "messages");
    const messageQuery = query(messagesRef, orderBy("createdAt"));
    const messagesDocs = await getDocs(messageQuery);
    const messageList = messagesDocs.docs.map(doc => doc.data());
    return messageList;
  }
}

export async function getMessages (setMessages: Function) {
  const messagesRef = collection(db, "messages");
  const messageQuery = query(messagesRef, orderBy("createdAt"));

  const unsubscribe = onSnapshot(messageQuery, (data) => {
    const messageList = data.docs.map(doc => doc.data());

    setMessages(messageList)
  });

  return unsubscribe
}

export async function sendDbMessage (message: Message) {
  const newDoc = await addDoc(collection(db, "messages"), {
    createdAt: serverTimestamp(),
    ...message,
  });
}
