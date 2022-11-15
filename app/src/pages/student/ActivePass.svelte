<script lang="ts">
	import Page from "../../components/Page.svelte";
	import type { Pass } from "@grant-pass/schema";
	import type { Typesaurus } from "typesaurus";
	import { onDestroy } from "svelte";

	export let pass: Typesaurus.Doc<Extract<Pass, { status: "issued" }>, never>;

	let elapsedSeconds: number = 0;

	const interval = setInterval(() => {
		elapsedSeconds = Math.floor(
			(Date.now() - pass.data.issued_at.getTime()) / 1000
		);
	}, 1000);
	onDestroy(() => clearInterval(interval));

	function formatTwoDigits(n: number): string {
		return Math.floor(n).toString().padStart(2, "0");
	}
</script>

<Page>
	<div class="wrapper">
		<div class="timer">
			{`${formatTwoDigits(elapsedSeconds / 60)}:${formatTwoDigits(
				elapsedSeconds % 60
			)}`}
		</div>

		<div class="card">
		</div>
	</div>
</Page>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.timer {
		flex-grow: 1;

		font-size: 5em;
	}

	.card {
		align-self: stretch;

		border-radius: 16px;
		background-color: var(--oc-gray-2);

		padding: 16px;
	}
</style>
