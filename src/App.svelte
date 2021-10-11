<script lang="ts">
	import Router, { location, push } from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import Switch from './components/switch.svelte';
	let screenReader = false;

	//Impoort routes
	import Home from "./routes/home.svelte";
	push("/home"); // Go home
</script>

<main>
	<div class="navbar">
		<div class="left">
			<Switch bind:checked={screenReader}></Switch>
			<span>Screen Reader</span>
		</div>

		<div class="right">
			<span>Bruno Silva</span>
			<img src="assets/user.png" alt="User">
		</div>
	</div>

	<div class="content">
		<Router
			routes={{
				"/home": wrap({
					component: Home
				})
			}}
		/>
	</div>	
</main>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0px 30px;
		padding-top: 20px;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.left span {
		margin-left: 20px;
	}

	.right {
		display: flex;
		align-items: center;
	}

	.right img {
		margin-left: 20px;
		width: 45px;
	}

	main {
        height: 100%;
        background-color: #F9F9F9;
		display: flex;
		flex-direction: column;
	}

	.content{
		height: 100%;
		flex: 1;
	}
</style>