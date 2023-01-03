import { User } from "@holly/schema";
import { User as FBUser } from "firebase/auth";
import { createContext, useContext } from "react";
import { Typesaurus } from "typesaurus";

export type AuthContextVal = {
	firebase: FBUser;
	document: Typesaurus.Doc<User, "users">;
} | null;

const AuthContext = createContext<AuthContextVal>(null);

export const useAssumedAuth: () => NonNullable<AuthContextVal> = () => {
	const auth = useContext(AuthContext);

	if (!auth) {
		throw new Error("auth context was assumed to be non-null, but it was null");
	}

	return auth;
};

export default AuthContext;
