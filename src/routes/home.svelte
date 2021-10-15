<script>
    import Search from "../components/search_bar.svelte";
    import Tile from "../components/tile.svelte";
	import {fade} from 'svelte/transition';

    let opened = false;

    let tiles = [
        { icon: "assets/google.png", name: "Google Suite" },
        { icon: "assets/phone.png", name: "Set-up Phone" },
        { icon: "assets/teams.png", name: "Use Teams" },
        { icon: "assets/docs.png", name: "Google Docs" },
        { icon: "assets/map.png", name: "Access Map" },
        { icon: "assets/eye.png", name: "View All" }
    ];
</script>

<main in:fade="{{duration: 300}}">
    <img class="logo" src="assets/logo.svg" alt="Optio.me Logo" />

    <div class="bar">
        <Search />
    </div>

    <div class="tiles">
        {#each tiles as tile, id}
            <Tile {tile} id={id} />
        {/each}
    </div>

    <div class="feedback flex" style="{opened ? 'height: 440px':  'height: 50px'}">
        <div on:click={() => opened = !opened} class="header flex">
            {#if opened}
                <span class="material-icons">expand_more</span>
            {/if}
            {#if !opened}
                <img src="assets/4.png" alt="Emoticon">
            {/if}
            <h1 style="{opened ? 'margin-left: 0px' : 'margin-left: 20px'}">Feedback</h1>
        </div>

        {#if opened}
            <div class="form">
                <h2>We would appreciate your feedback to improve our website</h2>
                <h3 style="align-self: center;">How is your overall experience?</h3>

                <div class="flex">
                    {#each Array(5) as _, i}
                        <img src="assets/{i}.png" alt="Emoticon {i}">
                    {/each}
                </div>

                <hr class="solid">

                <h3>Any suggestions or comments?</h3>
                <div class="bottom flex">
                    <textarea type="text" id="feedback" name="Feedback Area" rows="4" cols="50"/>
                    <button on:click={() => opened = false} class="submit">Submit</button>
                </div>
            </div>
        {/if}
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

    .feedback {
        background: #F3F3F3;
        align-items: baseline;
        display: flex;
        flex-direction: column;
        border-radius: 30px;
        position: absolute;
        box-shadow: 0px 0px 9px rgb(0 0 0 / 21%);
        transition: all 0.5s ease;
        padding: 5px 20px;
        left: 20px;
        bottom: 20px;
		overflow: hidden;
        max-width: 340px;
    }

    .header {
        width: 100%;
    }

    .header img {
        width: 38px;
    }

    .header h1{
        font-size: 20px;
        color: #6A6A6A;
        text-align: center;
        width: 100%;
    }

    .form {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    hr.solid {
        border: 0;
        border-top: 1px solid #c5c5c5;
        border-right: 1px solid #c5c5c5;
        width: 100%;
        margin: 30px 0px 5px 0px;
    }

    .form img {
        width: 40px;
        margin-right: 10px;
    }

    .form h2 {
        font-weight: 500;
        font-size: 15px;
        width: 80%;
        text-align: center;
    }

    .form h3 {
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        align-self: baseline;
        margin-bottom: 20px;
    }

    textarea[type="text"] {
        height: 100%;
        width: 100%;
        display: inline-block;
        box-sizing: border-box;
        border: none;
        resize: none;
        padding: 10px;
        color: black;
        border-radius: 10px;
        background: #FAF9F9;
        margin: 0 !important;
        box-shadow: 0px 0px 9px rgb(0 0 0 / 16%);
        flex-grow: 1;
    }

    textarea:focus{
        border: none;
        outline: none;
    }


    .bottom {
        flex-direction: row;
        align-items: baseline;
        padding-bottom: 20px;
        flex: 1;
        width: 100%;
    }

    button {
        color: white;
        font-weight: 600;
        margin: -0.2px;
        font-size: 16px;
        background-color: #FF606F;
        margin-left: 20px;
        transition: all 0.5s ease;
        border-radius: 10px;
        border: none;
        align-self: flex-end;
        padding: 10px 20px;
    }

    @media only screen and (max-height: 700px) {

        main {
            margin-top: 100px;
        }
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
