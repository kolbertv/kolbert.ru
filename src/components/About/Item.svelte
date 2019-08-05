<style type="text/sass">
  p {
    text-align: justify;
    font-size: 16px;
  }

  @media (max-width: 699px) {
    div {
      width: 91%;
      margin-bottom: 10px
    }
  }

  @media (min-width: 700px) {
    div {
      width: 31%;
    }
  }
</style>

<div>
  <p>
    <slot />
  </p>
</div>
