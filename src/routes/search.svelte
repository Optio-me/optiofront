<script>
    import { push, querystring } from "svelte-spa-router";
    import { parse } from "qs";
    import { fade } from "svelte/transition";

    let results = [
        { id: 1, icon: "assets/meet.png", name: "Setup and use Google Meet" },
        {
            id: 2,
            icon: "assets/calendar.png",
            name: "Schedule Google Meet video",
        },
    ];

    let parsed;
    let request;
    let filtered;

    $: {
        parsed = parse($querystring);
        request = parsed && "request" in parsed ? parsed.request : "";

        filtered = results.filter(function (result) {
            return result.name.toLowerCase().includes(request);
        });
    }
</script>

<main in:fade={{ duration: 300 }} style={!filtered.length && `height: 100%`}>
    <div class="wrapper" style={!filtered.length && `display: flex; flex: 1`}>
        {#if filtered.length}
            <div class="header flex">
                <span class="material-icons">search</span>
                <span>Results</span>
            </div>
        {/if}

        <div
            class="list"
            style={!filtered.length && `flex: 1; align-self: center`}
        >
            {#if filtered.length && request}
                {#each filtered as result}
                    <div
                        on:click={() => push("/article/" + result.id)}
                        class="result flex"
                    >
                        <div class="flex">
                            <img src={result.icon} alt={result.name} />
                            <h2>{result.name}</h2>
                        </div>
                        <span class="material-icons pin">push_pin</span>
                    </div>
                {/each}
            {:else}
                <div class="none">
                    <h1>Sorry! No results found</h1>
                    <img src="assets/hand.png" alt="Hand" />
                    <h2>
                        Try searching again!
                    </h2>
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .wrapper {
        width: 100%;
        max-width: 50%;
    }

    .header {
        margin: 50px 0px;
    }

    .header span {
        margin-right: 20px;
    }

    .result {
        background-color: #f3f3f3;
        border-radius: 20px;
        padding: 15px 30px 15px 20px;
        margin-bottom: 40px;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.17);
        display: flex;
        justify-content: space-between;
    }

    .result img {
        max-width: 80px;
    }

    .result h2 {
        margin-left: 40px;
        font-size: 20px;
        font-weight: 400;
    }

    .pin {
        margin: 0;
        padding: 14px;
        font-size: 30px;
        color: #727272;
        border: 3px solid #acacac;
        box-sizing: border-box;
        border-radius: 11px;
    }

    .none {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .none img {
        width: 140px;
        margin: 50px;
    }

    @media only screen and (max-width: 500px) {
        .wrapper {
            width: 100%;
            max-width: 80%;
        }
    }
</style>
