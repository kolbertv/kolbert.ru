<script>
  import Image from "../components/Header/Image.svelte";
  import Contact from "../components/Contact/Contact.svelte";
  import Title from "../components/Title.svelte";
  import About from "../components/About/About.svelte";
  import Portfolio from "../components/Portfolio/Portfolio.svelte";
  import Blog from "../components/Blog/Blog.svelte";
  import Connect from "../components/Connect/Connect.svelte";
</script>

<style type="text/sass">

</style>

<svelte:head>
  <title>Кольберт Владимир / Vladimir Kolbert</title>
</svelte:head>

<Image />
<Contact />
<Title name={'Резюме'} id={'resume'} />
<About />
<Title name={'Портфолио'} id={'portfolio'} />
<Portfolio />
<Title name={'Блог'} id={'blog'} />
<Blog />
<Title name={'Контакты'} id={'connect'} />
<Connect />
