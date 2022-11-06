<script lang="ts">
	import { onMount } from "svelte";
	import { auth, signInWithGoogle, user } from "./firebase";
	import Teacher from "./pages/Teacher.svelte";

	onMount(async () => {
		if (auth.currentUser === null) {
			await signInWithGoogle();
		}
	});
</script>

{#if $user}
	{#if $user.email.endsWith("@student.pps.net")}
		Student
	{:else if $user.email.endsWith("@pps.net") || $user.email.endsWith("@gmail.com")}
		<!-- FIXME: remove gmail testing domain -->
		<Teacher teacherUid={$user.uid} />
	{:else}
		You are not a PPS user. Please sign in using your @pps.net or
		@student.pps.net Google account.
	{/if}
{/if}

<style lang="scss">
</style>
