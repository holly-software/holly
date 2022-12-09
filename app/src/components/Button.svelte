<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button";
 
    export let style: "primary" | "danger" = "primary";
	export let disabled: boolean = false;
</script>

<button on:click {type} class:disabled class={style}>
	<slot />
</button>

<style lang="scss">
	button {
		height: 2.5em;
        padding: 0 1.5em;

		border-radius: 8px;

        font-size: 1.15em;

        cursor: pointer;

        &.primary {
            background: var(--oc-blue-6);
            color: var(--oc-gray-0);
        }

        &.danger {
            background: var(--oc-red-6);
            color: var(--oc-gray-0);
        }

		&.disabled {
			background: var(--oc-gray-3);
            color: var(--oc-gray-9);

			border: 1px solid var(--oc-red-5);
		}
	}
</style>
