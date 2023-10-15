<script lang="ts">
  import "@material/web/button/filled-button";

  let counter = 0;
</script>

<main>
  <md-filled-button on:click={() => counter++}>Button +{counter}</md-filled-button>
</main>

<style>
</style>
