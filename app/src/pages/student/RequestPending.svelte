<script lang="ts">
	import Page from "../../components/Page.svelte";
	import { Plane } from "svelte-loading-spinners";
	import type { Typesaurus } from "typesaurus";
	import type { Pass } from "@holly/schema";
	import Loading from "../../components/Loading.svelte";
	import Button from "../../components/Button.svelte";

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
		<Loading type="plane" color="var(--green)" height="unset" />
		<p>Waiting for confirmation...</p>
		<Button on:click={cancel} style="danger">Cancel</Button>
	</main>
</Page>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
	}

	p {
		margin: 24px 0;
		font-size: 1.25em;
	}
</style>
