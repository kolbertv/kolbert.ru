<script>
  import Row from "./FooterRow.svelte";
  import Menu from "../Nav/Menu.svelte";
  import Social from "../Social/Social.svelte";

  let footer = 1;
</script>

<style type="text/sass">
  footer {
    height: 180px;
    display: flex;
    margin-top: 40px;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 25px 0;
  }
  span {
    font-size: 12px;
  }
</style>

<footer class="back_gray">
  <div class="container wrap">
    <Row>
      <Menu footer="true" />
    </Row>
    <Row>
      <a href="/">
        <span>Кольберт Владимир / Vladimir Kolbert</span>
      </a>
    </Row>
    <Row>
      <Social />
    </Row>
  </div>
</footer>
