<script lang="ts">
	import Page from "../../components/Page.svelte";
	import type { Pass } from "@grant-pass/schema";
	import type { Typesaurus } from "typesaurus";
	import { db, reactiveQuery } from "../../firebase";
	import LiveDuration from "../../components/LiveDuration.svelte";

	export let pass: Typesaurus.Doc<Extract<Pass, { status: "issued" }>, never>;

	let holder = reactiveQuery(db.users.get(pass.data.holder));
	let issuer = reactiveQuery(db.users.get(pass.data.issuer));
</script>

<Page>
	<div class="wrapper">
		<div class="timer">
			<LiveDuration start={pass.data.issued_at} />
		</div>

		<div class="spacer" />

		<div class="card">
			<div>
				<div class="card-label">Name</div>
				<div class="card-value">
					{$holder?.data?.name ?? pass.data.holder_name}
				</div>
			</div>
			<div>
				<div class="card-label">Issued At</div>
				<div class="card-value">
					{pass.data.issued_at.toLocaleTimeString()}
				</div>
			</div>
			<div>
				<div class="card-label">Reason</div>
				<div class="card-value">{pass.data.reason}</div>
			</div>
			<div>
				<div class="card-label">Teacher</div>
				<div class="card-value">{$issuer?.data?.name ?? ""}</div>
			</div>
		</div>
	</div>

	<div class="footnotes">
		<p>This pass will run until the teacher ends it or the period is over.</p>
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
		font-size: 5em;
	}

	.spacer {
		height: 24px;
	}

	.card {
		align-self: stretch;

		border-radius: 16px;
		background-color: var(--oc-gray-2);
		box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.25);

		padding: 24px;

		display: grid;
		grid-template-columns: 50% 50%;
		row-gap: 32px;

		&-label {
			font-size: 0.8em;
			font-weight: 800;
			color: var(--oc-gray-6);
		}
	}

	.footnotes {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;

		padding: 24px 12px;

		text-align: center;

		p {
			font-style: italic;
			font-size: 0.75em;
			color: var(--oc-gray-6);
		}
	}
</style>
