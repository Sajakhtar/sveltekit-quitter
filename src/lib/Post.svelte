<script>
  export let id, user, content, likes = 0, comments = [], publicURL = null

</script>

<article class="card text-center shadow-2xl">

  {#if publicURL}
    <figure class="px-10 pt-10">
      <img src={publicURL}>
    </figure>
  {/if}

  <div class="card-body">
    <h2 class="card-title">{user} says...</h2>
    <p>{content}</p>

    <div class="justify-center card-actions">
      <button class="btn btn-outline btn-accent">More info</button>
    </div>
  </div>

</article>
