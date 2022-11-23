<script lang="ts">
	import { db, reactiveQuery, signInWithGoogle, user } from "./firebase";
	import Teacher from "./pages/Teacher.svelte";
	import Student from "./pages/student/Student.svelte";
	import Page from "./components/Page.svelte";
	import { Circle } from "svelte-loading-spinners";
	import { Capacitor } from "@capacitor/core";

	enum State {
		Loading,
		Teacher,
		Student,
		InvalidUser,
	}
	let state = State.Loading;


	user.subscribe(async (user) => {
		// see the comment in firebase.ts for why this is necessary
		if (Capacitor.isNativePlatform()) {
			if (user == null) {
				await signInWithGoogle("consent");
			}
		} else {
			if (user === null) {
				await signInWithGoogle("consent");
			}
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
	<div class="loading">
		<Circle color="var(--oc-blue-6)" />
	</div>
{:else if state === State.Student}
	<Student />
{:else if state === State.Teacher}
	<Teacher />
{:else if state === State.InvalidUser}
	<Page heading="Invalid Account">
		<p>
			You are not signed in with a PPS account. Please sign in using your
			@pps.net or @student.pps.net Google account.
		</p>

		<button on:click={() => signInWithGoogle("select_account")}>
			Switch Accounts
		</button>
	</Page>
{/if}

<style lang="scss">
	p {
		margin: 16px 0;
	}

	button {
		background-color: var(--oc-blue-6);
		color: var(--oc-gray-0);

		padding: 8px;
		border-radius: 6px;

		cursor: pointer;
	}

	.loading {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
