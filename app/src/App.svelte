<script lang="ts">
	import { onMount } from "svelte";
	import { auth, db, reactiveQuery, signInWithGoogle, user } from "./firebase";
	import Teacher from "./pages/Teacher.svelte";
	import Student from "./pages/student/Student.svelte";

	enum State {
		Loading,
		Teacher,
		Student,
		InvalidUser,
	}
	let state = State.Loading;

	user.subscribe(async (user) => {
		if (user === null) {
			await signInWithGoogle("consent");
		}
	});

	$: userDoc = $user && reactiveQuery(db.users.get(db.users.id($user.uid)));
	$: {
		if (!userDoc || $userDoc === null) {
			state = State.Loading;
		} else if ($userDoc.data.role_teacher) {
			state = State.Teacher;
		} else if ($userDoc.data.role_student) {
			state = State.Student;
		} else {
			state = State.InvalidUser;
		}
	}
</script>

{#if state === State.Loading}
	Loading...
{:else if state === State.Student}
	<Student />
{:else if state === State.Teacher}
	<Teacher />
{:else if state === State.InvalidUser}
	<p>
		You are not a PPS user. Please sign in using your @pps.net or
		@student.pps.net Google account.
	</p>

	<button on:click={() => signInWithGoogle("select_account")}>
		Switch Accounts
	</button>
{/if}

<style lang="scss">
	p,
	button {
		margin: 16px 32px;
	}

	button {
		background-color: var(--oc-blue-6);
		color: var(--oc-gray-0);

		padding: 8px;
		border-radius: 6px;

		cursor: pointer;
	}
</style>
