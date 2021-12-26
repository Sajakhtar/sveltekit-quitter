<script>
  import { createPost } from '$lib/services'

  let postContent = ''
</script>


<form class="form-control" on:submit|preventDefault={handleCreatePost}>
  <label for="post" class="label">
    <span class="label-text text-xl">What would you like to post?</span>
  </label>
  <textarea bind:value={postContent} id="post" class="textarea h-24 textarea-bordered"></textarea>
  <button class="btn">Post it</button>
</form>
