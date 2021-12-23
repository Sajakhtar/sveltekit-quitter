<script>
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import { getUser, signIn } from '$lib/services'
  import Error from '$lib/Error.svelte'

  // redirect if already signed in
  const user = getUser()
  if (browser && user) goto('/')
</script>
