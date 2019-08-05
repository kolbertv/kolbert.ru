<script>
  export let title;
  export let icon;
</script>

<style type="text/sass">
  @media (min-width: 900px) {
    .wrap {
      height: 180px;
      width: 31%;
      margin: 5px;
    }
  }

  @media (min-width: 700px) {
    .wrap {
      height: 210px;
      width: 31%;
      margin: 5px;
    }
  }


  @media (max-width: 699px) {
    .wrap {
      height: 150px;
      width: 91%;
      margin: 10px;
    }
  }

  .wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.27);
    padding: 10px;
    align-items: center;
  }
  h2 {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 600;
    margin: 15px;
    text-align: center;
  }
  span {
    text-align: center;
    padding: 5px;
  }
  .icon {
    background-color: white;
    position: absolute;
    top: -15px;
    padding: 0 10px;
  }
</style>

<div class="wrap">
  <div class="icon">{icon}</div>
  <h2>{title}</h2>
  <span>
    <slot />
  </span>
</div>
