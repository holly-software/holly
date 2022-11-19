import { schema, Typesaurus } from "typesaurus";
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

			holder: Typesaurus.Id<"users">;
			// stored so we don't have to look up the user's name when we display the pass
			// TODO: look up holder's name when the pass is displayed and remove this field, assuming it's not too slow
			holder_name: string;
			issuer: Typesaurus.Id<"users">;

			reason: string;

			requested_at: Typesaurus.ServerDate;
	  }
	| {
			status: "aborted";

			holder: Typesaurus.Id<"users">;
			holder_name: string;
			issuer: Typesaurus.Id<"users">;

			reason: string;

			aborted_by: "issuer" | "holder";

			requested_at: Typesaurus.ServerDate;
			aborted_at: Typesaurus.ServerDate;
	  }
	| {
			status: "issued";
			holder: Typesaurus.Id<"users">;
			holder_name: string;
			issuer: Typesaurus.Id<"users">;

			reason: string;

			requested_at: Typesaurus.ServerDate;
			issued_at: Typesaurus.ServerDate;
	  }
	| {
			status: "revoked";

			holder: Typesaurus.Id<"users">;
			holder_name: string;
			issuer: Typesaurus.Id<"users">;

			reason: string;

			revoked_by: "issuer" | "bell";

			requested_at: Typesaurus.ServerDate;
			issued_at: Typesaurus.ServerDate;
			revoked_at: Typesaurus.ServerDate;
	  };
