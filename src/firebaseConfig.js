import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAyRYIlb35VPt1luVsICuieHAMIzxO8eOk",
    authDomain: "vuegram-ae546.firebaseapp.com",
    databaseURL: "https://vuegram-ae546.firebaseio.com",
    projectId: "vuegram-ae546",
    storageBucket: "",
    messagingSenderId: "1003838759608"
};
firebase.initializeApp(config);

// firebase utils
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    provider,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}