<script>
  // your script goes here
  export let file

  $: console.log(file)

  function getFile(e) {
    file = !!e.target.files.length && e.target.files[0]
  }
</script>

<input on:change={getFile} class="input" type="file">
