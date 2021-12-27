<script>
  import Error from '$lib/Error.svelte'
  import { createPost, getUser } from '$lib/services'

  let postContent = ''

  let createPostPromise = Promise.resolve({})
  function handleCreatePost() {
    createPostPromise = createPost({user: getUser().email, content: postContent})
  }

</script>


<form class="form-control" on:submit|preventDefault={handleCreatePost}>
  <label for="post" class="label">
    <span class="label-text text-xl">What would you like to post?</span>
  </label>
  <textarea bind:value={postContent} id="post" required class="textarea h-24 textarea-bordered"></textarea>

  {#await createPostPromise}
    <button disabled type="button" class="btn">Post it</button>
  {:then {data, error}}
    <button class="btn">Post it</button>
    {#if data}
      <!-- can put data in a component, similar to Error -->
      <strong class="text-green-500">Successfully created post</strong>
    {/if}
    <Error {error} />
  {/await}

</form>
