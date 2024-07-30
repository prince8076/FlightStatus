import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAVwZyRmY0OE-VBnUaGOjCwvGElGC7qwzU",
    authDomain: "flight-39f54.firebaseapp.com",
    projectId: "flight-39f54",
    storageBucket: "flight-39f54.appspot.com",
    messagingSenderId: "52719086184",
    appId: "1:52719086184:web:cfd49ecddffaecc79769dd",
    measurementId: "G-T55R85C0DZ"
};


export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
