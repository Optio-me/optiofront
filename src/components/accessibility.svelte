<script>
    import Switch from "./switch.svelte";
    let selectedSize = 0;
    let screenReader = false;
    let sizes = [["Regular", 15], ["Medium", 19], ["Large", 23]];
</script>

<main>

    <div class="header flex">
        <span class="material-icons" style="font-size: 40px; margin-right: 20px">accessibility_new</span>
        <h1>Accessibility</h1>
    </div>

    <h2 class="heading">Text Size</h2>

    <div class="flex">
        {#each sizes as size, i}
            <h3 style="font-size: {size[1]}px; {selectedSize === i ? "background-color: #363636; color: white;": 
                "background-color: white; color: #363636; border: 2px solid #ababab;"}" class="selectFont" on:click={() => selectedSize = i}>{size[0]}</h3>
        {/each}
    </div>
  
    <h2 class="heading" style="margin-bottom: 30px;">Visuals</h2>

    <Switch bind:checked={screenReader} />
  

    <div class="flex themes">
        <div class="selected">
            <img src="assets/light.png" alt="Light Mode"/>
            <div class="flex themeInfo">
                <span class="material-icons">lightbulb</span>
                <span>Light Mode</span>
            </div>
        </div>
        <img src="assets/dark.png" alt="Dark Mode"/>
    </div>

</main>

<style>

    main {
        padding: 50px;
        flex-direction: column;
    }

    .heading {
        margin-top: 30px;
        font-weight: 400;
    }

    .selectFont {
        padding: 10px;
        transition: all 0.2s ease;
        justify-content: center;
        align-items: center;
        display: flex;
        align-content: center;
        font-weight: 400;
        border-radius: 10px;
        width: 140px;
        height: 30px;
        margin-right: 20px;
    }

    .themes {
        margin-top: 40px;
    }

    .themes img {
        width: 400px;
    }

    .selected {
        background-color: #F4F4F4;
        border: 2px solid #b0b0b0;
        border-radius: 20px;
        margin-right: 40px;
        padding: 20px;
    }

    .themeInfo {
        margin-top: 10px;
    }

    .themeInfo span:last-of-type {
        margin-left: 10px;
    }
</style>