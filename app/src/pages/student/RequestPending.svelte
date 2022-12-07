<script lang="ts">
	import Page from "../../components/Page.svelte";
	import { Plane } from "svelte-loading-spinners";
	import type { Typesaurus } from "typesaurus";
	import type { Pass } from "@holly/schema";
	import Loading from "../../components/Loading.svelte";

	export let pass: Typesaurus.Doc<Pass, "passes">;

	async function cancel() {
		await pass.update(($) => ({
			status: "aborted",
			aborted_by: "holder",
			aborted_at: $.serverDate(),
		}));
	}
</script>

<Page>
	<main>
		<Loading type="plane" color="var(--oc-blue-5)" height="unset" />
		<p>Waiting for confirmation...</p>
		<button on:click={cancel}>Cancel</button>
	</main>
</Page>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	p {
		margin: 24px 0;
		font-size: 1.25em;
	}

	button {
		padding: 8px 24px;

		border-radius: 4px;
		cursor: pointer;

		color: white;
		background-color: var(--oc-red-5);
	}
</style>
