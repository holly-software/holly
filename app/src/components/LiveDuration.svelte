<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	export let start: Date | null;

	function formatTwoDigits(n: number): string {
		return Math.floor(n).toString().padStart(2, "0");
	}

	function formatDuration(ms: number) {
		const seconds = ms / 1000;

		let formatted = "";

		if (seconds / 60 >= 60) {
			formatted += `${formatTwoDigits(seconds / 60 / 60)}:`;
		}

		formatted += `${formatTwoDigits((seconds / 60) % 60)}:`;
		formatted += `${formatTwoDigits(seconds % 60)}`;

		return formatted;
	}

	let formatted: string = start
		? formatDuration(Date.now() - start.getTime())
		: formatDuration(0);

	const interval = setInterval(() => {
		formatted = formatDuration(Date.now() - start.getTime());
	}, 1 * 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{formatted}
