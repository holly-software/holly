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

	async function revoke(pass: Typesaurus.Doc<Pass, never>) {
		await pass.update(($) => ({
			status: "revoked",
			revoked_by: "issuer",
			revoked_at: $.serverDate(),
		}));
	}
</script>

<Page>
	<div class="wrapper">
		<div class="cancel">
			<button on:click={() => revoke(pass)}>End</button>
		</div>
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

	button {
		padding: 8px 24px;

		border-radius: 4px;
		cursor: pointer;

		color: white;
		background-color: var(--oc-red-5);
	}
</style>
