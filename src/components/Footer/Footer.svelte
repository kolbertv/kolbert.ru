<script>
  import Row from "./FooterRow.svelte";
  import Menu from "../Nav/Menu.svelte";

  let footer = 1;
</script>

<style type="text/sass">
  footer {
    height: 180px;
    display: flex;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 25px 0;
  }
</style>

<footer class="back_gray">
  <div class="container wrap">
    <Row>
      <Menu footer="true" />
    </Row>
    <Row>
      <a href="/">Кольберт Владимир</a>
    </Row>
    <Row>
      <a href="/">Кольберт Владимир</a>
    </Row>
  </div>
</footer>
