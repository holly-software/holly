<script lang="ts">
	import Page from "../../components/Page.svelte";
</script>

<Page heading="Request Pass">
	<form on:submit|preventDefault>
		<div class="form-item">
			<label for="teacher">Teacher</label>
			<input type="text" id="teacher" />
		</div>

		<div class="form-item">
			<label for="reason">Reason</label>
			<input type="text" id="reason" />
		</div>

		<div class="spacer" />

		<div class="form-item">
			<button type="submit">Submit</button>
		</div>
	</form>
</Page>

<style lang="scss">
	form {
		flex-grow: 1;
		margin-top: 16px;

		display: flex;
		flex-direction: column;

		.spacer {
			flex-grow: 1;
		}

		.form-item {
			margin: 12px 0;

			label {
				display: block;
				margin: 4px 0;
			}

			input, button {
				width: 100%;
			}
		}

		input {
			padding: 8px 12px;

			border: 1px solid var(--oc-gray-5);
			border-radius: 8px;
			background-color: var(--oc-gray-1);

			&:focus,
			&:hover {
				outline: none;

				border-color: var(--oc-blue-6);
				background-color: var(--oc-gray-2);
			}
		}

		button {
			padding: 12px;

			cursor: pointer;

			border-radius: 8px;

			color: var(--oc-gray-0);
			background-color: var(--oc-blue-6);

			font-size: 1.15em;
			font-weight: 800;
		}
	}
</style>
