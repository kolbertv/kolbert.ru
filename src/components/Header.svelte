<script>
  import Nav from "./Nav/Nav.svelte";
  import Logo from "./Logo.svelte";
</script>

<style type="text/sass">
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.19)
  }
</style>

<header class="back_gray">
  <div class="container wrap back_gray">
    <Logo />
    <Nav />
  </div>
</header>
