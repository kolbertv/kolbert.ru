<script>
  export let footer;
  export let link;
</script>

<style type="text/sass">
  li {
    margin: 0 0.3rem 0 0.3rem;
  }
  a {
    text-transform: uppercase;
    font-weight: 500;
  }

  @media (max-width: 599px) {
    .header {
      font-size: 26px;
    }
  }

  @media (min-width: 600px) {
    .header {
      font-size: 14px;
    }
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
