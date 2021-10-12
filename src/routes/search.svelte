<script>
    import { querystring } from "svelte-spa-router";
    import { parse } from "qs";

    let results = [
        { id: 1, icon: "assets/meet.png", name: "Setup and use Google Meet" },
        { id: 2, icon: "assets/calendar.png", name: "Schedule Google Meet video" },
    ];

    let parsed = parse($querystring);
    let request = parsed && "request" in parsed ? parsed.request : "";

    results = results.filter(function (result) {
        return result.name.toLowerCase().includes(request)});
</script>

<main  style="{!results.length && `height: 100%`}">
    <div class="wrapper" style="{!results.length && `display: flex; flex: 1`}">

        {#if results.length}
            <div class="header flex">
                <span class="material-icons">search</span>
                <span>Results</span>
            </div>
        {/if}

        <div class="list" style="{!results.length && `flex: 1; align-self: center`}">
            {#if results.length}
                {#each results as result}
                    <div class="result flex">
                        <img src={result.icon} alt={result.name} />
                        <span>{result.name}</span>
                    </div>
                {/each}
            {:else}
                <div class="none">
                    <h1>Sorry! No results found</h1>
                    <img src="assets/hand.png" alt="Hand"/>
                    <h2>Were you looking for these?<h2>
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
        padding: 15px 20px;
        margin-bottom: 40px;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.17);
    }

    .result img {
        max-width: 90px;
    }

    .result span {
        margin-left: 40px;
        font-size: 20px;
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
