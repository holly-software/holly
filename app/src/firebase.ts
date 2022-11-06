import { writable } from "svelte/store";
import { Capacitor } from "@capacitor/core";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	signInWithPopup,
	browserSessionPersistence,
	setPersistence,
	connectAuthEmulator,
	onAuthStateChanged,
	signInWithCredential,
} from "firebase/auth";
import { FirebaseAuthentication as NativeFirebaseAuthentication } from "@capacitor-firebase/authentication";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const app = initializeApp({
	apiKey: "AIzaSyD22YgNtuN4VA0JJn2nnS0Su0Ovy5hT8rA",
	authDomain: "grant-hall-pass.firebaseapp.com",
	projectId: "grant-hall-pass",
	storageBucket: "grant-hall-pass.appspot.com",
	messagingSenderId: "715846738009",
	appId: "1:715846738009:web:9a65b4ecfe35c0d3519148",
});

export const auth = getAuth(app);

export const user = writable(auth.currentUser);
onAuthStateChanged(auth, user.set);
user.subscribe(console.log);

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();

	if (Capacitor.isNativePlatform()) {
		const result = await NativeFirebaseAuthentication.signInWithGoogle();
		const credential = GoogleAuthProvider.credential(
			result.credential?.idToken
		);

		await signInWithCredential(auth, credential);
	} else {
		await signInWithPopup(auth, provider).then((res) => {
			setPersistence(auth, browserSessionPersistence);
		});
	}
};

export const db = getFirestore(app);

if (import.meta.env.DEV) {
	connectAuthEmulator(auth, "http://localhost:9099");
	connectFirestoreEmulator(db, "localhost", 8080);
}

export default app;
