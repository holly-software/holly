<script lang="ts">
	export let heading: string | undefined = undefined;
</script>

<div>
	{#if heading !== undefined}
		<h1>{heading}</h1>
	{/if}

	<slot />
</div>

<style lang="scss">
	div {
		min-height: 100vh;
		width: 100vw;

		margin: auto;
		max-width: 600px;

		padding: 32px;

		display: flex;
		flex-direction: column;
		justify-content: start;
	}

	h1 {
		font-size: 1.75em;
		font-weight: 800;
	}
</style>
