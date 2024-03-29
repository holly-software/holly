<script lang="ts">
	import Icon from "@iconify/svelte";
	import { db, reactiveQuery, user } from "../firebase";
	import { get } from "svelte/store";
	import Page from "../components/Page.svelte";
	import LiveDuration from "../components/LiveDuration.svelte";
	import type { Typesaurus } from "typesaurus";
	import type { Pass } from "@holly/schema";
	import { slide } from "svelte/transition";

	let passes = reactiveQuery(
		db.passes.query(($) => [
			$.field("issuer").equal(db.users.id(get(user).uid)),
			$.field("status").in(["requested", "issued"]),
		]),
		[]
	);

	$: requests = $passes.filter((doc) => doc.data.status === "requested");
	$: issued = $passes.filter((doc) => doc.data.status === "issued");

	async function issue(pass: Typesaurus.Doc<Pass, "passes">) {
		await pass.update(($) => ({
			status: "issued",
			issued_at: $.serverDate(),
		}));
	}

	async function abort(pass: Typesaurus.Doc<Pass, "passes">) {
		await pass.update(($) => ({
			status: "aborted",
			aborted_by: "issuer",
			aborted_at: $.serverDate(),
		}));
	}

	async function revoke(pass: Typesaurus.Doc<Pass, "passes">) {
		await pass.update(($) => ({
			status: "revoked",
			revoked_by: "issuer",
			revoked_at: $.serverDate(),
		}));
	}
</script>

<Page>
	<main>
		<div class="heading">
			<h1>Active Passes</h1>
			<div class="count">{issued.length}</div>
		</div>
		{#each issued as pass (pass.ref.id)}
			<div class="pass" transition:slide>
				<div>
					<div class="holder">{pass.data.holder_name}</div>
					<ul class="info">
						<li><LiveDuration start={pass.data.issued_at} /></li>
						<li>{pass.data.reason}</li>
					</ul>
				</div>

				<div class="actions">
					<button class="red" on:click={() => revoke(pass)}>
						<Icon icon="tabler:x" />
					</button>
				</div>
			</div>
		{/each}

		<div class="heading">
			<h1>Pass Requests</h1>
			<span class="count">{requests.length}</span>
		</div>

		{#each requests as pass (pass.ref.id)}
			<div class="pass" transition:slide>
				<div>
					<div class="holder">{pass.data.holder_name}</div>
					<ul class="info">
						<li>{pass.data.reason}</li>
					</ul>
				</div>

				<div class="actions">
					<button class="green" on:click={() => issue(pass)}>
						<Icon icon="tabler:check" />
					</button>
					<button class="red" on:click={() => abort(pass)}>
						<Icon icon="tabler:x" />
					</button>
				</div>
			</div>
		{/each}
	</main>
</Page>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	.heading {
		margin: 16px 0;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		h1 {
			font-size: 1.25em;
			font-weight: 700;
		}

		.count {
			display: block;
			padding: 4px 8px;

			font-size: 0.85em;

			color: var(--col-fg);
			background-color: var(--col-green);
			border-radius: 8px;
		}
	}

	.pass {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		padding: 6px 12px;
	}

	// .name {
	// 	font-size: 1.15em;
	// }

	.info {
		color: var(--col-fg-contrast);

		display: flex;
		flex-direction: row;

		li {
			&:not(:last-of-type)::after {
				margin: 0 2px;
				content: "·";
			}
		}
	}

	.actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;

		button {
			margin-left: 8px;

			min-width: 48px;
			height: 40px;

			padding: 8px;
			border-radius: 6px;

			cursor: pointer;

			&.green {
				color: white;
				background-color: var(--col-green);
			}

			&.red {
				color: white;
				background-color: var(--col-red);
			}
		}
	}
</style>
