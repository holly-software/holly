import type { Pass, User } from "@grant-pass/schema";
import { initializeApp } from "firebase-admin/app";
import * as functions from "firebase-functions";
import { schema } from "typesaurus";

const db = schema(($) => ({
	users: $.collection<User>(),
	passes: $.collection<Pass>(),
}));

initializeApp();

export const initializeUserDocument = functions.auth
	.user()
	.onCreate(async (user, _ctx) => {
		if (!user.email || !user.emailVerified) {
			throw new Error("new user does not have a verified email");
		}

		await db.users.set(db.users.id(user.uid), {
			name: user.displayName ?? "No Name",

			role_admin: false,
			role_teacher: user.email.endsWith("@pps.net"),
			role_student: user.email.endsWith("@student.pps.net"),
		});
	});
