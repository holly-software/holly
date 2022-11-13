<script lang="ts">
	import Page from "../../components/Page.svelte";
	import SelectInput from "../../components/SelectInput.svelte";
</script>

<Page heading="Request Pass">
	<form on:submit|preventDefault>
		<div class="form-item">
			<label for="teacher">Teacher</label>
			<SelectInput
				id="teacher"
				options={[
					{ value: "A", label: "A" },
					{ value: "B", label: "B" },
					{ value: "C", label: "C" },
					{ value: "D", label: "D" },
				]}
			/>
		</div>

		<div class="form-item">
			<label for="reason">Reason</label>
			<SelectInput
				id="reason"
				options={[
					{ value: "Bathroom", label: "Bathroom" },
					{ value: "Water", label: "Water" },
					{ value: "Counselor", label: "Counselor" },
					{ value: "Quiet Space", label: "Quiet Space" },
				]}
				allowCustom={true}
			/>
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

			:global(input),
			button {
				width: 100%;
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
