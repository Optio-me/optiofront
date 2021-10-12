<script>
    import Search from "../components/search_bar.svelte";
    import Tile from "../components/tile.svelte";

    let tiles = [
        { icon: "assets/phone.png", name: "Set-up Phone" },
        { icon: "assets/map.png", name: "Access Map" },
        { icon: "assets/laptop.png", name: "Set-up Laptop" },
        { icon: "assets/google.png", name: "Google Suite" },
        { icon: "assets/map.png", name: "Access Map" },
        { icon: "assets/map.png", name: "Access Map" },
    ];
</script>

<main>
    <img class="logo" src="assets/logo.svg" alt="Optio.me Logo" />

    <div class="bar">
        <Search />
    </div>

    <div class="tiles">
        {#each tiles as tile, id}
            <Tile {tile} index={id} />
        {/each}
    </div>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
    }

    .tiles {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 3rem;
    }

    .bar {
        width: 100%;
        margin: 90px 0px;
        max-width: 700px;
    }

    @media only screen and (max-width: 700px) {
        .bar {
            max-width: 80%;
            margin-bottom: 80px;
        }

        .tiles {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 4rem;
        }

        .logo {
            width: 300px;
            margin-top: 120px;
        }
    }

    @media only screen and (max-width: 500px) {
        .bar {
            margin-bottom: 50px;
        }

        .tiles {
            grid-gap: 1rem;
        }

        .logo {
            width: 200px;
            margin-top: 170px;
        }
    }
</style>
