<script>
  import Error from '$lib/Error.svelte'
  import UploadImage from '$lib/UploadImage.svelte';
  import { createPost, getUser } from '$lib/services'

  let file = null
  let postContent = ''

  let createPostPromise = Promise.resolve({})

  function handleCreatePost() {
    createPostPromise = createPost({user: getUser().email, content: postContent, imageFile: file})
  }

</script>


<form class="form-control" on:submit|preventDefault={handleCreatePost}>
  <label for="post" class="label">
    <span class="label-text text-xl">What would you like to post?</span>
  </label>
  <UploadImage bind:file />
  <textarea bind:value={postContent} id="post" required class="textarea h-24 textarea-bordered mb-2"></textarea>

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
