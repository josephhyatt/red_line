import firebase from "firebase";

const config = {
	/* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
	apiKey: "AIzaSyD9gtz8FXfUc4pzFpx1t1CAX0zL6vZ2Zrk",
	authDomain: "team-red-line.firebaseapp.com",
	projectId: "team-red-line",
	storageBucket: "team-red-line.appspot.com",
	messagingSenderId: "247478723931",
	appId: "1:247478723931:web:7038a42f5ec7a8a182267e",
	measurementId: "G-R2WR0HVV0F",
};
const fire = firebase.initializeApp(config);
export default fire;
