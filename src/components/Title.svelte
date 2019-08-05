<script>
  export let name;
  export let id;
</script>

<style>
  .wrap {
    height: 40px;
    display: flex;
    align-items: center;
    margin: 40px 0;
  }
  .line {
    border-top: 1px solid rgba(0, 0, 0, 0.27);
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    width: 100%;
    top: 20px;
    z-index: 0;
  }
  .wrapper {
    position: relative;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name {
    display: block;
    background-color: white;
    z-index: 1;
    padding: 0 30px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 18px;
  }
</style>

<div class="wrap" {id}>
  <div class="container wrapper">
    <div class="line" />
    <div class="name">{name}</div>
  </div>
</div>
