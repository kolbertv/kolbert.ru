<script>
  export let footer;
  export let link;
</script>

<style type="text/sass">
  li {
    margin: 0 0 0 0.5rem;
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
