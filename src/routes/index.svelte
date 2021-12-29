<script context="module"> // runs before page load
  import {getPosts} from '$lib/services'

  export async function load({page, fetch, session, context}) {
    const {data, error} = await getPosts()

    return {
      props: {
        posts: data,
        error
      }
    }
  }
</script>


<script>
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import CreatePost from '$lib/CreatePost.svelte'
  import Post from '$lib/Post.svelte'
  import Error from '$lib/Error.svelte'
  import {signOut, getUser} from '$lib/services'

  export let posts, error

  // redirect to login if there is not a current user
  const user = getUser()
  if (browser && !user) goto('/login')

  async function handleSignout() {
    await signOut()
    goto('/login')
  }
</script>

<header class="flex justify-between">
  <h1 class="text-2xl">Quitter (a copy of Twitter)</h1>
  <button on:click={handleSignout} class="btn btn-sm">Logout</button>
</header>

<CreatePost />

<Error {error} />

{#each posts || [] as post}
  <Post {...post} />
{:else}
  No posts found
{/each}
