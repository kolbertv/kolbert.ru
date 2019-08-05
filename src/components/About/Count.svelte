<script>
    export let name;
    export let count;

</script>

<style>
    .wrap {
        /* border: 1px solid green; */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 180px;
    }
    .count {
        font-weight: 700;
    }
    .name {
        text-align: center;
    }


</style>

<div class="wrap">
    <span class="count">{count}</span>
    <span class="name">{name}</span>
</div>