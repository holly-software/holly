<script lang="ts">
	import { auth, db, reactiveQuery, signInWithGoogle, user } from "./firebase";
	import Teacher from "./pages/Teacher.svelte";
	import Student from "./pages/student/Student.svelte";
	import Page from "./components/Page.svelte";
	import Loading from "./components/Loading.svelte";
	import Button from "./components/Button.svelte";

	enum State {
		Loading,
		Teacher,
		Student,
		NoUser,
		InvalidUser,
	}
	let state = State.Loading;

	$: userDoc = $user && reactiveQuery(db.users.get(db.users.id($user.uid)));
	$: {
		if ($user === undefined || $userDoc === null) {
			state = State.Loading;
		} else if ($user === null) {
			state = State.NoUser;
		} else if ($userDoc.data.roles.teacher) {
			state = State.Teacher;
		} else if ($userDoc.data.roles.student) {
			state = State.Student;
		} else {
			state = State.InvalidUser;
		}
	}
</script>

{#if state === State.Loading}
	<Loading height="100vh" type="circle" color="var(--oc-blue-6)" />
{:else if state === State.Student}
	<Student />
{:else if state === State.Teacher}
	<Teacher />
{:else if state === State.NoUser}
	<Page heading="Not Signed In">
		<p>You are not signed in with your Google account.</p>

		<Button
			on:click={() => signInWithGoogle("consent")}
		>
			Sign In
		</Button>
	</Page>
{:else if state === State.InvalidUser}
	<Page heading="Invalid Account">
		<p>
			You are not signed in with a PPS account. Please sign in using your
			@pps.net or @student.pps.net Google account.
		</p>

		<Button on:click={() => signInWithGoogle("select_account")}>
			Switch Accounts
		</Button>
	</Page>
{/if}

<style lang="scss">
	p {
		margin: 16px 0;
	}
</style>
