<script>
  export let footer;
  import Item from "./Item.svelte";
</script>

<style type="text/sass">
  ul {
    display: flex;
  }
</style>

<ul>
  <Item link={'/'} {footer}>Главная</Item>
  <Item link={'/#resume'} {footer}>Резюме</Item>
  <Item link={'/#portfolio'} {footer}>Портфолио</Item>
  <Item link={'/#blog'} {footer}>Блог</Item>
  <Item link={'/#contact'} {footer}>Контакты</Item>
</ul>
