<script>
  // supabase returns errors that have a message we can show users
  export let error
</script>


{#if condition}
  <strong class="text-red-600">{error.message}</strong>
{/if}
