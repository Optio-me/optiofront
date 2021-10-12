<script>
    import {login} from '../auth/auth';
	import {fade} from 'svelte/transition'

</script>

<main>
    <div class="left">
        <div class="top">
            <img src="assets/logo.svg" alt="Optio.me Logo"/>
            <h1>Welcome Back</h1>
        </div>

        <div class="bottom">
            <img src="assets/microsoft.png" alt="Microsoft Logo"/>
            <button on:click={() => {
				login()
			}}>Sign In</button>
        </div>
    </div>
    
    <div class="right">
        <img src="assets/login.png" alt="Illustration"/>
    </div>
</main>

<style>

    main {
        display: flex;
        height: 100%;
    }

    .left {
        padding: 80px;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .top h1 {
        font-size: 60px;
        font-weight: 400;
        width: 200px;
    }

    .top img {
        width: 200px;
    }

    .bottom {
        display: flex;
        flex-direction: column;
    }

    .bottom img {
        width: 200px;
        margin-bottom: 50px;
    }

    button {
        background-color: #191824;
        color: white;
        border-radius: 20px;
        border: none;
        padding: 20px;
        font-size: 20px;
        font-weight: 600;
        width: 200px;
    }

    .right {
        background-color: white;
        width: 100%;
        flex: 1;
        max-width: 100%;
        overflow-x: hidden;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        display: flex;   
        justify-content: center;
    }

    .right img {
        align-self: center;
        width: 650px;
        height: 550px;
    }

</style>