<script>
  export let footer = false;
  export let header = false;
  import Item from "./Item.svelte";

  let cl = false;
  let handleClick = () => {
    cl = !cl;
  };
</script>

<style type="text/sass">
  @media (max-width: 599px) {
    .header {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 65px;
      background-color: rgba(255, 255, 255, 0.9);
      height: calc(100% - 65px);
      width: 100%;
    }
    .burger {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    .none {
      display: none;
    }
    .visible {
      display: flex;
    }
  }

  @media (min-width: 600px) {
    .header {
      display: flex;
      flex-direction: row;
    }
    .burger {
      display: none;
    }
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    border-bottom: solid 2px black;
  }
  .bar2 {
    margin: 10px 0;
  }

  .bar1-tr {
    transform: rotate(45deg) translate(8px, 9px);
  }

  .bar2-tr {
    opacity: 0;
  }

  .bar3-tr {
    transform: rotate(-45deg) translate(8px, -10px);
  }

  .com {
    display: flex;
  }
</style>

{#if header}
  <div class="burger" id="burger" on:click={handleClick}>
    <div class="bar1 {cl ? 'bar1-tr' : ''}" />
    <div class="bar2 {cl ? 'bar2-tr' : ''}" />
    <div class="bar3 {cl ? 'bar3-tr' : ''}" />
  </div>
{/if}

<ul class="{header ? 'header' : 'com'} {cl ? 'visible' : 'none'} ">
  <Item link={'/'} {footer}>Главная</Item>
  <Item link={'/#resume'} {footer}>Резюме</Item>
  <Item link={'/#portfolio'} {footer}>Портфолио</Item>
  <Item link={'/#blog'} {footer}>Блог</Item>
  <Item link={'/#contact'} {footer}>Контакты</Item>
</ul>
