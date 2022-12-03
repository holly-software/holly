import { writable, type Readable } from "svelte/store";
import { Capacitor } from "@capacitor/core";
import { initializeApp } from "firebase/app";
import {
	getAuth as NativeGetAuth,
	GoogleAuthProvider,
	browserSessionPersistence,
	setPersistence,
	connectAuthEmulator,
	onAuthStateChanged,
	signInWithCredential,
	signInWithRedirect,
	initializeAuth,
	indexedDBLocalPersistence,
	signInWithPopup,
} from "firebase/auth";
import { FirebaseAuthentication as NativeFirebaseAuthentication } from "@capacitor-firebase/authentication";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { schema } from "typesaurus";
import type { TypesaurusCore } from "typesaurus/types/core";
import type { User, Pass } from "@grant-pass/schema";

const app = initializeApp({
	apiKey: "AIzaSyD22YgNtuN4VA0JJn2nnS0Su0Ovy5hT8rA",
	authDomain: "grant-hall-pass.firebaseapp.com",
	projectId: "grant-hall-pass",
	storageBucket: "grant-hall-pass.appspot.com",
	messagingSenderId: "715846738009",
	appId: "1:715846738009:web:9a65b4ecfe35c0d3519148",
});

// ios hackery
// see: https://harryherskowitz.com/2021/08/23/firebase-capacitor.html
export const getAuth = () => {
	let auth;
	if (Capacitor.isNativePlatform()) {
		auth = initializeAuth(app, {
			persistence: indexedDBLocalPersistence,
		});
	} else {
		auth = NativeGetAuth(app);
	}
	return auth;
};

export const auth = getAuth();

export const user = writable();
onAuthStateChanged(auth, user.set);

export const signInWithGoogle = async (
	prompt?: "none" | "consent" | "select_account"
) => {
	const provider = new GoogleAuthProvider();

	provider.setCustomParameters({ prompt });

	if (Capacitor.isNativePlatform()) {
		const result = await NativeFirebaseAuthentication.signInWithGoogle();
		const credential = GoogleAuthProvider.credential(
			result.credential?.idToken
		);

		initializeAuth(app, {
			persistence: indexedDBLocalPersistence,
		});

		await signInWithCredential(auth, credential);
	} else {
		// we need to use signInWithPopup here
		// see: https://github.com/firebase/firebase-js-sdk/issues/4256
		// https://github.com/firebase/firebase-js-sdk/issues/6443
		await signInWithPopup(auth, provider).then((res) => {
			setPersistence(auth, browserSessionPersistence);
		});
	}
};

export const untypedDb = getFirestore(app);

export const db = schema(($) => ({
	users: $.collection<User>(),
	passes: $.collection<Pass>(),
}));

export const reactiveQuery: <Result>(
	query: TypesaurusCore.SubscriptionPromise<unknown, Result, unknown>,
	initial?: Result
) => Readable<Result | null> = (query, initial) => {
	const store = writable(initial ?? null);
	query.on((res, _meta) => store.set(res));
	return store;
};

if (import.meta.env.DEV) {
	connectAuthEmulator(auth, "http://localhost:9099");
	connectFirestoreEmulator(untypedDb, "localhost", 9080);
}

export default app;
