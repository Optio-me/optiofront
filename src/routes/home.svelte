<script>
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
    <img src="assets/logo.svg" alt="Optio.me Logo" />

    <div class="search">
        <span class="material-icons">search</span>
        <input
            placeholder="Search me..."
            type="text"
            id="search_box"
            name="Search Box"
        /><br />
    </div>

    <div class="tiles">
        {#each tiles as tile}
            <div class="tile">
                <img src={tile.icon} alt={tile.name} />
                <div>{tile.name}</div>
            </div>
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

    .search {
        width: 100%;
        display: flex;
        max-width: 700px;
        margin: 90px 0px;
        padding: 10px;

        border: 2px solid #6b6b6b;
        box-sizing: border-box;
        border-radius: 10px;

        background-color: white;
    }

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

    .tiles {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 3rem;
    }

    input {
        width: inherit;
        margin-left: 10px;
    }
</style>
