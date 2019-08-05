<script>
  export let title;
  export let cont;
</script>

<style type="text/sass">
  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content {
    font-weight: 700;
    font-size: 16px;
  }
</style>

<div class="wrap">
  <p class="title">{title}</p>
  <p class="content">{cont}</p>
</div>
