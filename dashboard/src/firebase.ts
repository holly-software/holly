import { initializeApp } from "firebase/app";
import {
	connectAuthEmulator,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut as fbSignOut,
	type User as FBUser,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { schema, Typesaurus } from "typesaurus";
import type { TypesaurusCore } from "typesaurus/types/core";
import type { User, Pass } from "@holly/schema";
import { useEffect, useState } from "react";

export const app = initializeApp({
	apiKey: "AIzaSyBH10BCoFKPtPWeaW4_xT3g5CSfqgnAwrw",
	authDomain: "holly-prod.firebaseapp.com",
	projectId: "holly-prod",
	storageBucket: "holly-prod.appspot.com",
	messagingSenderId: "100310942224",
	appId: "1:100310942224:web:2e9dc19ec0e65accae8095",
	measurementId: "G-FT1H160GDK",
});

export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();
authProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = async () => {
	await signInWithPopup(auth, authProvider);
};

export const signOut = () => fbSignOut(auth);

let cachedUser: FBUser | null | undefined;
let getUserCbs: ((user: FBUser | null) => void)[] = [];
auth.onAuthStateChanged((user) => {
	cachedUser = user;
	getUserCbs.forEach((cb) => cb(user));
	getUserCbs = [];
});
export const getUser: () => Promise<FBUser | null> = () => {
	if (cachedUser !== undefined) {
		return Promise.resolve(auth.currentUser);
	} else {
		return new Promise((resolve) => {
			getUserCbs.push(resolve);
		});
	}
};

export const untypedDb = getFirestore(app);
export const db = schema(($) => ({
	users: $.collection<User, Typesaurus.Id<"users">>(),
	passes: $.collection<Pass, Typesaurus.Id<"passes">>(),
}));

export const useReactiveQuery: <Result>(
	query: TypesaurusCore.SubscriptionPromise<unknown, Result, unknown>,
	initial?: Result
) => Result | undefined = (query, initial) => {
	const [result, setResult] = useState(initial);

	useEffect(() => {
		query.on((newResult, _meta) => setResult(newResult));
	}, [query]);

	return result;
};

if (import.meta.env.DEV) {
	connectAuthEmulator(auth, "http://localhost:9099");
	connectFirestoreEmulator(untypedDb, "localhost", 9080);
}
