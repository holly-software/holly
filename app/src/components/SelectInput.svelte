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

	$: applicableOptions = searchedOption
		? options
		: options.filter((option) => {
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

	{#if !allowCustom && applicableOptions.length === 0}
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

		border: 1px solid var(--col-bg-contrast);
		border-radius: 8px;
		background-color: var(--col-bg);
		color: var(--text);

		&:focus,
		&:hover {
			outline: none;

			border-color: var(--col-green);
			background-color: var(--col-bg-contrast);
		}
	}

	.options {
		margin-top: 12px;

		max-height: 200px;
		overflow-y: scroll;

		border: 1px solid var(--col-bg-contrast);
		border-radius: 8px;
		background-color: var(--col-bg);

		padding: 8px;

		.option {
			width: 100%;

			border-radius: 8px;

			padding: 6px 12px;

			&:hover {
				background-color: var(--col-bg-contrast);
			}
		}

		.no-options {
			text-align: center;
		}
	}
</style>
