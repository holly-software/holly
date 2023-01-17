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
            background: var(--green);
            color: var(--font);
        }

        &.danger {
            background: var(--red);
            color: var(--font);
        }

		&.disabled {
			background: var(--disabled-button);
            color: var(--font-contrast);
            
			// border: 1px solid var(--oc-red-5);

            cursor: not-allowed;
		}
	}
</style>
