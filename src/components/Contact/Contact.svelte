<script>
  import Item from "./Item.svelte";
</script>

<style type="text/sass">
  .border {
    border-top: 1px solid rgba(0, 0, 0, 0.19);
  }
  .wrap {
  }
  .flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
  }
</style>

<div class="back_gray wrap">
  <div class="container border flex">
    <Item title={'Телефон'} cont={'+7(999)998-78-78'}></Item>
    <Item title={'Почта'} cont={'kolbert@yandex.ru'}></Item>
  </div>
</div>
