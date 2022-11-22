<script lang="ts">
	import { onDestroy, onMount } from "svelte";


    export let start: Date;

    function formatTwoDigits(n: number): string {
        return Math.floor(n).toString().padStart(2, "0");
    }

    function formatDuration(ms: number) {
        const seconds = ms / 1000;
        return `${formatTwoDigits(seconds / 60)}:${formatTwoDigits(seconds % 60)}`;
    }

    let formatted: string = formatDuration(Date.now() - start.getTime());

    const interval = setInterval(() => {
        formatted = formatDuration(Date.now() - start.getTime());
    }, 1 * 1000);

    onDestroy(() => {
        clearInterval(interval)
    })
</script>

{formatted}