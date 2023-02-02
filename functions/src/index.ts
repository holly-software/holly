import type { Pass, User } from "@holly/schema";
import { initializeApp } from "firebase-admin/app";
import * as functions from "firebase-functions";
import { schema } from "typesaurus";

initializeApp();

const db = schema(($) => ({
	users: $.collection<User>(),
	passes: $.collection<Pass>(),
}));

export const createUserDocument = functions.auth
	.user()
	.onCreate(async (user, _ctx) => {
		if (!user.email || !user.emailVerified) {
			throw new Error("new user does not have a verified email");
		}

		await db.users.set(db.users.id(user.uid), {
			name: user.displayName ?? "No Name",

			roles: {
				admin: false,
				teacher: user.email.endsWith("@pps.net"),
				student: user.email.endsWith("@student.pps.net"),
			},
		});
	});

export const deleteUserDocument = functions.auth
	.user()
	.onDelete(async (user, _ctx) => {
		await db.users.remove(db.users.id(user.uid));
	});
