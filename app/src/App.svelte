<script lang="ts">
	import { onMount } from "svelte";
	import { identity } from "svelte/internal";
	import { get } from "svelte/store";
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

	onMount(async () => {
		if (auth.currentUser === null) {
			await signInWithGoogle();
		}
	});

	user.subscribe(async (user) => {
		if (user === null) {
			return;
		}

		const { data } = await db.users.get(db.users.id(auth.currentUser.uid));
		if (data.role_teacher) {
			state = State.Teacher;
		} else if (data.role_student) {
			state = State.Student;
		} else {
			state = State.InvalidUser;
		}
	});
</script>

{#if state === State.Loading}
	Loading
{:else if state === State.Student}
	<Student />
{:else if state === State.Teacher}
	<Teacher />
{:else if state === State.InvalidUser}
	You are not a PPS user. Please sign in using your @pps.net or @student.pps.net
	Google account.
{/if}

<style lang="scss">
</style>
