<script>
  export let id, user, content, likes = 0, comments = [], publicURL = null

</script>



<article class="card shadow-sm bg-accent text-accent-content">

  {#if publicURL}
    <figure>
      <img src={publicURL}>
    </figure>
  {/if}

  <div class="card-body">
    <h2 class="card-title">{user} says...</h2>
    <p>{content}</p>

    <div class="card-actions">
      <button class="btn btn-secondary">More info</button>
    </div>
  </div>

</article>
