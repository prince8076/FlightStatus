importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAVwZyRmY0OE-VBnUaGOjCwvGElGC7qwzU",
    authDomain: "flight-39f54.firebaseapp.com",
    projectId: "flight-39f54",
    storageBucket: "flight-39f54.appspot.com",
    messagingSenderId: "52719086184",
    appId: "1:52719086184:web:cfd49ecddffaecc79769dd",
    measurementId: "G-T55R85C0DZ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});