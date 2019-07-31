<script>
    export let title;
    export let icon;

</script>

<style type="text/sass">
    .wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 180px;
        width: 300px;
        border: 1px solid rgba(0, 0, 0, 0.27); 
        padding: 10px;
        align-items: center;
        margin: 5px;

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
    <span><slot /></span>
</div>