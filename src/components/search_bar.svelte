<script>
    import { push } from "svelte-spa-router";
    import { onMount } from 'svelte';

    let possibleResults = [
       "use google meet",
       "use teams",
       "use dimensions tablet",
       "use accessible map",
       "create meeting with google",
       "create google account",
       "create google doc",
       "share google doc",
       "nearby accessible cinemas"
    ];
    
    export let search = "";
    let bar;
    let visible = false;
    let filtered = [];
    let focused = false;

    onMount(() => bar.focus());

    const onKeyPress = e => {
        if (e.charCode === 13 && search) push("#/search?request=" + search);

        filtered = possibleResults.filter(function (result) {
            return result.toLowerCase().includes(search)
        });
    };
</script>


<div class="search">
    <div class="flex holder">
        <span class="material-icons">search</span>
        <input
            style="line-height: 20px;"
            placeholder="Search me..."
            type="text"
            id="search_box"
            name="Search Box"
            bind:this={bar}
            on:keypress={onKeyPress}
            on:focus={() => focused = true}
            on:blur={()=> focused = false}
            bind:value={search}
            on:input={() => visible = search }
        /><br />
    </div>

    <div on:click={()=> {if(search) push("#/search?request=" + search)}} class="searchBtn flex" style="{visible ? 'width: 110px': 'opacity: 0.5'}">
        <span>Search</span>
    </div>

    {#if search && filtered.length}
        <div class="autofill">
            {#each filtered as result, i}
                <span on:click={()=> push("#/search?request=" + result)}>{result}</span>
                {#if i !== filtered.length - 1}
                    <hr class="solid">
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .search {
        width: 100%;
        display: flex;
        max-width: inherit;
        border: 2px solid #6b6b6b;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: white;
    }

    .autofill {
        position: absolute;
        box-sizing: border-box;
        margin-top: 59px;
        z-index: 0;
        max-width: inherit;
        border-radius: 10px;
        padding: 30px;
        border: 2px solid #6b6b6b;
        color: black;
        width: inherit;
        background-color: #FFFFFF;
    }

    .holder {
        padding: 10px; 
        width: inherit;
        justify-content: space-between;
    }

    input {
        width: inherit;
        margin-left: 10px;
    }


    hr.solid {
        border: 0;
        border-top: 1px solid #c5c5c5;
        border-right: 1px solid #c5c5c5;
        width: 100%;
        margin: 15px 0px;
    }

    .searchBtn{
        justify-content: center;
        color: white;
        font-weight: 600;
        margin: -0.2px;
        font-size: 16px;
        border-radius: 0px 8px 8px 0px;
        width: 0px;
        height: inherit;
        overflow: hidden;
        background-color: #FF606F;
        transition: all 0.5s ease;
    }
</style>