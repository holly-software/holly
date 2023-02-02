<script lang="ts">
	import { Circle, Plane } from "svelte-loading-spinners";

	export let width: string | undefined = "100%";
	export let height: string | undefined = "100%";

	export let type: "circle" | "plane";
	export let size: string | number | undefined = undefined;
	export let color: string = "var(--col-green)";
</script>

<div style={`width: ${width}; height: ${height}`}>
	{#if type === "circle"}
		<Circle {size} {color} />
	{:else if type === "plane"}
		<Plane {size} {color} />
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
