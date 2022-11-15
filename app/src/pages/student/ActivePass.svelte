<script lang="ts">
	import Page from "../../components/Page.svelte";
	import type { Pass} from "@grant-pass/schema";
	import type { Typesaurus } from "typesaurus";

	export let pass: Typesaurus.Doc<Extract<Pass, { status: "issued" }>, never>;
</script>

<Page>
	<div class="wrapper">
        <div class="timer">{pass.data.issued_at}</div>
	</div>
</Page>
