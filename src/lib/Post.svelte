<script>
  import Error from '$lib/Error.svelte'
  import { createComment, createLike, getUser } from '$lib/services'

  // id is post ID, user is Post's user, not logged-in user
  // these export vars matche the items within `{...post}` from index which comes from getPost() service i.e. all the posts, comments likes from supabase
  export let id, user, content, likes = 0, comments = [], publicURL = null

  let commentContent = ''
  let createCommentPromise = Promise.resolve({})

  function addComment() {
    createCommentPromise = createComment({user: getUser().email, post: id, content: commentContent})
      .then(({data, error}) => {
        comments = [data, ...comment]
        return {data, error}
      })
  }

  function addLike() {
    likes += 1
    createLike({user: getUser().email, post: id})
  }

</script>

<article class="card text-center shadow-2xl mt-8">

  {#if publicURL}
    <figure class="px-10 pt-10">
      <img src={publicURL} class="rounded-xl">
    </figure>
  {/if}

  <div class="card-body">
    <h2 class="card-title text-left">{user} says...</h2>
    <p class="text-left">{content}</p>

    <div class="card-actions flex justify-between my-4">

      {#await createCommentPromise}
        Posting comment...
      {:then {data, error}}
        <Error {error} />
        {#if data}
          Thanks for commenting
        {/if}

        <form class="form-control" on:submit|preventDefault={addComment}>
          <div class="flex space-x-2">
            <input bind:value={commentContent} type="text" placeholder="your thoughts" class="w-full input input-primary input-bordered">
            <button class="btn btn-primary">comment</button>
          </div>
        </form>

      {/await}


      <button on:click={addLike} class="btn btn-outline btn-accent">{likes} {likes === 1 ? 'Like' : 'Likes'}</button>

    </div>

    {#each comments as comment}
      <!-- {comment.user} says... <q>{comment.content}</q> -->

      <div class="card shadow-2xl lg:card-side bg-secondary text-secondary-content my-1">
        <div class="card-body text-left">
          <p>{comment.user} says... <q>{comment.content}</q></p>
        </div>
      </div>

    {/each}
  </div>

</article>
