<script>
  import Image from "../components/Header/Image.svelte";
  import Contact from "../components/Contact/Contact.svelte";
  import Title from "../components/Title.svelte";
  import About from "../components/About/About.svelte";
</script>

<style type="text/sass">
  h1 {
    color: red;
  }
</style>

<svelte:head>
  <title>Кольберт Владимир</title>
</svelte:head>

<Image />
<Contact />
<Title name={'Резюме'} id={'resume'} />
<About />
<Title name={'Портфолио'} id={'portfolio'} />

<div class="container">
  <h1>sdfghjkl</h1>
</div>
