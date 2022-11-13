<script lang="ts">
	import type { User } from "@grant-pass/schema";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import type { Typesaurus } from "typesaurus";
	import Page from "../../components/Page.svelte";
	import SelectInput, {
		type Option,
	} from "../../components/SelectInput.svelte";
	import { db, user } from "../../firebase";

	let teacher: Option<Typesaurus.Id<"users">> | null = null;
	let reason: Option<string> | null = null;

	let teachers: Typesaurus.Doc<User, "users">[] = [];
	onMount(async () => {
		teachers = await db.users.query(($) => [$.field("role_teacher").equal(true)]);
	});

	async function submit() {
		if (teacher === null || reason === null) {
			return;
		}

		db.passes.add(($) => ({
			status: "requested",

			holder: db.users.id(get(user).uid),
			// FIXME: this should get the name from the user's profile, not their Google account
			holder_name: get(user).displayName,
			issuer: teacher.value,

			reason: reason.value,

			requested_at: $.serverDate(),
		}));
	}
	$: canSubmit = teacher !== null && reason !== null;
</script>

<Page heading="Request Pass">
	<form on:submit|preventDefault={submit}>
		<div class="form-item">
			<label for="teacher">Teacher</label>
			<SelectInput
				id="teacher"
				bind:selected={teacher}
				options={teachers.map((teacher) => ({
					label: teacher.data.name,
					value: teacher.ref.id,
				}))}
			/>
		</div>

		<div class="form-item">
			<label for="reason">Reason</label>
			<SelectInput
				id="reason"
				bind:selected={reason}
				options={[
					{ value: "Bathroom", label: "Bathroom" },
					{ value: "Water", label: "Water" },
					{ value: "Counselor", label: "Counselor" },
					{ value: "Quiet Space", label: "Quiet Space" },
					{ value: "Office", label: "Office"}
				]}
				allowCustom={true}
			/>
		</div>

		<div class="spacer" />

		<div class="form-item">
			<button type="submit" class:can-submit={canSubmit}>Submit</button>
		</div>
	</form>
</Page>

<style lang="scss">
	form {
		flex-grow: 1;
		margin-top: 16px;

		display: flex;
		flex-direction: column;

		.spacer {
			flex-grow: 1;
		}

		.form-item {
			margin: 12px 0;

			label {
				display: block;
				margin: 4px 0;
			}

			:global(input),
			button {
				width: 100%;
			}
		}

		button {
			padding: 12px;

			cursor: pointer;

			font-size: 1.15em;
			font-weight: 800;

			border: 1px solid var(--oc-red-5);
			border-radius: 8px;
			background-color: var(--oc-gray-3);

			&.can-submit {
				border: none;
				color: var(--oc-gray-0);
				background-color: var(--oc-blue-6);
			}
		}
	}
</style>
