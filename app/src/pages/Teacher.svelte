<script lang="ts">
	import Icon from "@iconify/svelte";
	// TODO: figure out why UMD import doesn't work
	import db from "@grant-pass/schema/src/index";
	import { reactiveQuery } from "../firebase";

	export let teacherUid: string;

	let docs = reactiveQuery(
		db.passes.query(($) => [
			$.field("issuer").equal(db.users.ref(db.users.id(teacherUid))),
			$.field("status").in(["requested", "active"]),
		]),
		[]
	);

	$: requests = $docs.filter((doc) => doc.data.status === "requested");
	$: active = $docs.filter((doc) => doc.data.status === "active");
</script>

<main>
	<div class="heading">
		<span class="title">Active Passes</span>
		<span class="count">{active.length}</span>
	</div>
	{#each active as pass}
		<div class="pass">
			{pass.data.holder_name}
			<div class="actions">
				<button class="red">
					<Icon icon="tabler:x" />
				</button>
			</div>
		</div>
	{/each}

	<div class="heading">
		<span class="title">Pass Requests</span>
		<span class="count">{requests.length}</span>
	</div>

	{#each requests as pass}
		<div class="pass">
			{pass.data.holder_name}
			<div class="actions">
				<button class="green">
					<Icon icon="tabler:check" />
				</button>
				<button class="red">
					<Icon icon="tabler:x" />
				</button>
			</div>
		</div>
	{/each}
</main>

<style lang="scss">
	main {
		height: 100vh;
		width: 100vw;
		overflow-y: scroll;

		display: flex;
		flex-direction: column;
		align-items: stretch;

		padding: 16px;
	}

	.heading {
		margin: 16px 0;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.title {
			font-size: 1.25em;
			font-weight: 800;
		}

		.count {
			margin-right: 16px;

			display: block;
			padding: 4px 8px;

			font-size: 0.85em;

			color: white;
			background-color: var(--oc-blue-6);
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
				background-color: var(--oc-green-6);
			}

			&.red {
				color: white;
				background-color: var(--oc-red-6);
			}
		}
	}
</style>
