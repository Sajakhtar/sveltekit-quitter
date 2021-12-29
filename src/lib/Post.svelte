<script>
  import { createComment, createLike, getUser } from '$lib/services'

  // id is post ID, user is Post's user, not logged-in user
  export let id, user, content, likes = 0, comments = [], publicURL = null

  function addLike() {
    likes += 1
    createLike({user: getUser().email, post: id})
  }

</script>

<article class="card text-center shadow-2xl mt-8">

  {#if publicURL}
    <figure class="px-10 pt-10">
      <img src={publicURL}>
    </figure>
  {/if}

  <div class="card-body">
    <h2 class="card-title">{user} says...</h2>
    <p>{content}</p>

    <div class="card-actions flex justify-between">

      <form class="form-control">
        <div class="flex space-x-2">
          <input type="text" placeholder="your thoughts" class="w-full input input-primary input-bordered">
          <button class="btn btn-primary">comment</button>
        </div>
      </form>

      <button on:click={addLike} class="btn btn-outline btn-accent">{likes} {likes === 1 ? 'Like' : 'Likes'}</button>

    </div>

    {#each commentss as comment}
      {comment.user} says... <q>{comment.content}</q>
    {/each}
  </div>

</article>
