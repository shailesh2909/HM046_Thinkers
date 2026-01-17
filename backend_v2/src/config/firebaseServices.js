const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const firebaseApp = require("./firebase");

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

module.exports = { db, auth, storage, firebaseApp };
