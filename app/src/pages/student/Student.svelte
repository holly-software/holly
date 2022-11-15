<script lang="ts">
	import { get } from "svelte/store";
	import { db, reactiveQuery, user } from "../../firebase";
	import ActivePass from "./ActivePass.svelte";
	import RequestPass from "./RequestPass.svelte";
	import RequestPending from "./RequestPending.svelte";

	let passes = reactiveQuery(
		db.passes.query(($) => [
			$.field("holder").equal(db.users.id(get(user).uid)),
			$.field("status").in(["requested", "issued"]),
		]),
		[]
	);
	$: pass = $passes ? $passes[0] : null;

	$: console.log($passes);
</script>

{#if pass}
	{#if pass.data.status === "requested"}
		<RequestPending {pass} />
	{:else if pass.data.status === "issued"}
		<ActivePass {pass} />
	{/if}
{:else}
	<RequestPass />
{/if}
