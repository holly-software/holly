<script lang="ts" context="module">
	export type Option<T> = {
		value: T;
		label: string;
	};
</script>

<script lang="ts">
	import { slide } from "svelte/transition";

	export let id: string | undefined = undefined;
	export let options: Option<unknown>[];
	export let allowCustom: boolean = false;
	export let selected: Option<any> | null = null;

	let searchValue: string = "";

	function selectOption(option: Option<unknown>) {
		selected = option;
		searchValue = option.label;
	}

	$: searchedOption = options.find(
		(option) => option.label.toLowerCase() === searchValue.toLowerCase()
	);
	function finishSearch() {
		if (searchedOption) {
			selectOption(searchedOption);
		} else if (allowCustom) {
			selectOption({ value: searchValue, label: searchValue });
		} else {
			selected = null;
			searchValue = "";
		}
	}

	$: applicableOptions = options.filter((option) => {
		return option.label.toLowerCase().includes(searchValue.toLowerCase());
	});
</script>

<input {id} type="search" bind:value={searchValue} on:blur={finishSearch} />

<div class="options">
	{#each applicableOptions as option}
		<div
			class="option"
			transition:slide
			on:click={() => selectOption(option)}
			on:keypress={() => selectOption(option)}
		>
			{option.label}
		</div>
	{/each}

	{#if applicableOptions.length === 0}
		<div class="no-options">¯\_(ツ)_/¯</div>
	{/if}

	{#if allowCustom && searchValue !== "" && searchedOption === undefined}
		<div
			class="option"
			transition:slide
			on:click={() => selectOption({ value: searchValue, label: searchValue })}
			on:keypress={() =>
				selectOption({ value: searchValue, label: searchValue })}
		>
			Other: {searchValue}
		</div>
	{/if}
</div>

<style lang="scss">
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

	.options {
		margin-top: 12px;

		max-height: 200px;
		overflow-y: scroll;

		border: 1px solid var(--oc-gray-5);
		border-radius: 8px;
		background-color: var(--oc-gray-1);

		padding: 8px;

		.option {
			width: 100%;

			border-radius: 8px;

			padding: 6px 12px;

			&:hover {
				background-color: var(--oc-gray-3);
			}
		}

		.no-options {
			text-align: center;
		}
	}
</style>
