<script>
  export let footer;
  export let link;
</script>

<style type="text/sass">
  li {
    margin: 0 0 0 1rem;
  }
  a {
    text-transform: uppercase;
    font-weight: 500;
  }
  .header {
    font-size: 14px;
  }
  .footer {
    font-size: 12px;
  }
</style>

<li>
  <a href={link} class={footer ? 'footer' : 'header'}>
    <slot />
  </a>
</li>
