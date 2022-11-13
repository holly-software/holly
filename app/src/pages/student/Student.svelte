<script lang="ts">
	import { get } from "svelte/store";
	import { db, reactiveQuery, user } from "../../firebase";
	import RequestPass from "./RequestPass.svelte";

	let passes = reactiveQuery(
		db.passes.query(($) => [
			$.field("holder").equal(db.users.id(get(user).uid)),
			$.field("status").in(["requested", "active"]),
		]),
		[]
	);
    $: pass = $passes ? $passes[0] : null;

	$: console.log($passes);
</script>

{#if pass}
    {#if pass.data.status === "requested"}
        <p>You have a pass request pending.</p>
    {:else if pass.data.status === "active"}
        <p>You have an active pass.</p>
    {/if}
{:else}
	<RequestPass />
{/if}
