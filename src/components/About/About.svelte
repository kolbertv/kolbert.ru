<script>
  import Item from "./Item.svelte";
  import Prof from "./Prof.svelte";
  import Count from "./Count.svelte";
</script>

<style type="text/sass">
  .wrap {
    display: flex;
    justify-content: space-between;
  }
  .top {
    margin-top: 60px;
  }
  .center {
    align-items: center;

  }
  .heigth {
    height: 90px;
  }
</style>

<div class="container wrap">
  <Item>
    C 2002 по 2008 год занимался экспертизой промышленной безопасности и
    техническим диагностированием сосудов и аппаратов. Был инженером по
    неразрушающему контролю, методы контроля ВИК, УЗК, ПВК, АЭ.
  </Item>
  <Item>
    С 2002 по текущий день, выполняю работы по расчетам на прочность
    оборудования работающего под давлением, такое как подземные емкости,
    колонное оборудование, абсорберы, адсорберы, теплообменное оборудование и
    т.д.
  </Item>
  <Item>
    С 2017 года увлекся веб разработкой. В 2018, На IoT Хакатоне Ростелекома и
    Майл.ру, разработал API на Node.js для общения IoT устройств между собой.
  </Item>
</div>

<div class="container wrap top sec">
  <Prof title={'Расчеты на прочность'} icon={'icon'}>
    Колонные аппараты, горизонтальные сосуды, адсорберы, ...
  </Prof>
  <Prof title={'Разработка ПО'} icon={'icon'}>
    HTML, CSS, JavaScript, Node.js, Express.js, Mongo, Mongoose, Svelte, Sapper
  </Prof>
  <Prof title={'Разработка ПО'} icon={'icon'}>
    HTML, CSS, JavaScript, Node.js, Express.js, ejs, Svelte, Sapper
  </Prof>
</div>

<div class="back_gray top">
  <div class="container wrap center heigth">
    <Count name={'заказчиков'} count={7}></Count>
    <Count name={'выполненых проектов'} count={130}></Count>
    <Count name={'расчетов на прочность'} count={560}></Count>
    <Count name={'IoT Хакатон'} count={1}></Count>
  </div>
</div>
