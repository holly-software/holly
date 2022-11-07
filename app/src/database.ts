import { writable, type Readable } from "svelte/store";
import { schema, type Ref, type Typesaurus } from "typesaurus";
import type { TypesaurusCore } from "typesaurus/types/core";

export type User = {
	name: string;

	role_admin: boolean;
	role_teacher: boolean;
	role_student: boolean;
};

export type Pass =
	| {
			status: "requested";

			holder: Ref<User, "users">;
			// stored so we don't have to look up the user's name when we display the pass
			// TODO: look up holder's name when the pass is displayed and remove this field, assuming it's not too slow
			holder_name: string;
			issuer: Ref<User, "users">;

			reason: string;

			requested_at: Date;
	  }
	| {
			status: "active";

			holder: Ref<User, "users">;
			holder_name: string;
			issuer: Ref<User, "users">;

			reason: string;

			requested_at: Date;
			issued_at: Date;
	  }
	| {
			status: "revoked";

			holder: Ref<User, "users">;
			holder_name: string;
			issuer: Ref<User, "users">;

			reason: string;

			revoked_by: "issuer" | "bell";

			requested_at: Date;
			issued_at: Date;
			revoked_at: Date;
	  };

export default schema(($) => ({
	users: $.collection<User>(),
	passes: $.collection<Pass>(),
}));

export const reactiveQuery: <Result>(
	query: TypesaurusCore.SubscriptionPromise<unknown, Result, unknown>,
	initial?: Result,
) => Readable<Result | null> = (query, initial) => {
	const store = writable(initial ?? null);
	query.on((res, _meta) => store.set(res));
	return store;
};
