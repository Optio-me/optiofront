<script>
    import { push } from "svelte-spa-router";
    
    export let search = "";
    let visible = false;

    const onKeyPress = e => {
        if (e.charCode === 13) push("#/search?request=" + search);
    };
</script>


<div class="search">
    <div class="flex holder">
        <span class="material-icons">search</span>
        <input
            placeholder="Search me..."
            type="text"
            id="search_box"
            name="Search Box"
            on:keypress={onKeyPress}
            bind:value={search}
            on:input={() => visible = search }
        /><br />
    </div>

    <div class="searchBtn flex" style="{visible ? 'width: 110px': 'opacity: 0.5'}">

        <span >Search</span>
    </div>
</div>

<style>
    .search {
        width: 100%;
        display: flex;
        border: 2px solid #6b6b6b;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: white;
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