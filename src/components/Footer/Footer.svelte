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
    justify-content: center;
    align-items: center;
  }
</style>

<footer class="back_gray">
  <div class="container wrap">
    <Row>
      <Menu footer="true" />
    </Row>
    <Row>
      <h2>footer section</h2>
    </Row>
    <Row>
      <h2>footer section</h2>
    </Row>
  </div>
</footer>
