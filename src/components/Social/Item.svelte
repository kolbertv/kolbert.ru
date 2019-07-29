<script>
  export let link;
  export let icon;
</script>

<style type="text/sass">
  a {
    padding: 0 8px;
  }
  span {
    font-size: 24px;
    color: gray;
    &:hover {
      color: dimgray;
    }
  }
</style>

<a href={link}>
  <span>
    <i class={icon} />
  </span>
</a>
