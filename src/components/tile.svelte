<script>
    import { push } from "svelte-spa-router";
    export let tile;
    export let id;
</script>

<div on:click={() => push("#/article/" + id)} class="tile">
    <img src={tile.icon} alt={tile.name} />
    <div>{tile.name}</div>
</div>

<style>
    .tile {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 110px;
        height: 110px;

        padding: 20px;
        background: #ffffff;
        border: 2px solid #dadada;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }

    .tile img {
        width: 60px;
        margin-bottom: 20px;
    }
</style>
