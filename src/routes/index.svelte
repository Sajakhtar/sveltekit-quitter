<script>
  import CreatePost from '$lib/CreatePost.svelte'
  import Post from '$lib/Post.svelte'
</script>

<header class="flex justify-between">
  <h1 class="text-2xl">Quitter (a copy of Twitter)</h1>
  <button class="btn btn-sm">Logout</button>
</header>

<CreatePost />

{#each posts as post}
  <Post {...post} />
{/each}
