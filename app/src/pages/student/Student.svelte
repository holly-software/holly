<script lang="ts">
	import { get } from "svelte/store";
	import Loading from "../../components/Loading.svelte";
	import { db, reactiveQuery, user } from "../../firebase";
	import ActivePass from "./ActivePass.svelte";
	import RequestPass from "./RequestPass.svelte";
	import RequestPending from "./RequestPending.svelte";

	let passes = reactiveQuery(
		db.passes.query(($) => [
			$.field("holder").equal(db.users.id(get(user).uid)),
			$.field("status").in(["requested", "issued"]),
		]),
		null
	);
</script>

{#if $passes}
	{#if $passes.length}
		{@const pass = $passes[0]}

		{#if pass.data.status === "requested"}
			<RequestPending {pass} />
		{:else if pass.data.status === "issued"}
			<ActivePass {pass} />}
		{/if}
	{:else}
		<RequestPass />
	{/if}
{:else}
	<Loading type="circle" />
{/if}
