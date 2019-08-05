<script>
  import { onMount } from "svelte";
  import Item from "./Item.svelte";
  import Prof from "./Prof.svelte";
  import Count from "./Count.svelte";

  let rank = "Загрузка...";
  onMount(() => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://www.codewars.com/api/v1/users/kolbert"
    )
      .then(r => r.json())
      .then(r => {
        rank = r.ranks.overall.name;
      });
  });
</script>

<style type="text/sass">
  @media (min-width: 700px) {
    .wrap {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (max-width: 699px) {
    .wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  .top {
    margin-top: 40px;
  }
  .center {
    align-items: center;
  }
  .heigth {
    height: 90px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
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
    Колонные аппараты, горизонтальные сосуды, адсорберы, сепараторы, фильтры,...
  </Prof>
  <Prof title={'Разработка ПО'} icon={'icon'}>
    HTML, CSS/SCSS, JavaScript, Node.js, Express.js, Mongo, Mongoose, Svelte.js,
    Sapper, Gulp
  </Prof>
  <Prof title={'Инструменты'} icon={'icon'}>
    PVP-Design, MathCad, SolidWorks, СТАРТ, VSCode
  </Prof>
</div>

<div class="back_gray top">
  <div class="container flex center heigth">
    <Count name={'выполненых проектов'} count={130} />
    <Count name={'расчетов на прочность'} count={560} />
    <Count name={'Codewars Rank'} count={rank} />
    <Count name={'IoT Хакатон'} count={1} />

  </div>
</div>
