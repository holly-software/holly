import { writable, type Readable, type Writable } from "svelte/store";
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
	initializeAuth,
	indexedDBLocalPersistence,
	signInWithPopup,
	type User as FirebaseUser,
} from "firebase/auth";
import { FirebaseAuthentication as NativeFirebaseAuthentication } from "@capacitor-firebase/authentication";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { schema, type Typesaurus } from "typesaurus";
import type { TypesaurusCore } from "typesaurus/types/core";
import type { User, Pass } from "@holly/schema";

export const app = initializeApp({
	apiKey: "AIzaSyBH10BCoFKPtPWeaW4_xT3g5CSfqgnAwrw",
	authDomain: "holly-prod.firebaseapp.com",
	projectId: "holly-prod",
	storageBucket: "holly-prod.appspot.com",
	messagingSenderId: "100310942224",
	appId: "1:100310942224:web:d453f189b2167662ae8095",
	measurementId: "G-YJDT0LH6T5",
});

// ios hackery
// see: https://harryherskowitz.com/2021/08/23/firebase-capacitor.html
export const auth = Capacitor.isNativePlatform()
	? initializeAuth(app, { persistence: indexedDBLocalPersistence })
	: NativeGetAuth(app);

export const user: Writable<FirebaseUser | null | undefined> =
	writable(undefined);
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
	users: $.collection<User, Typesaurus.Id<"users">>(),
	passes: $.collection<Pass, Typesaurus.Id<"passes">>(),
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
