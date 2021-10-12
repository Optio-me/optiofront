<script lang="ts">
	import Router, { push, querystring } from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import { parse } from "qs";

	//Import Components
	import Bar from './components/search_bar.svelte';
	import Switch from "./components/switch.svelte";

	//Import routes
	import Home from "./routes/home.svelte";
	import Search from "./routes/search.svelte";
	import Article from "./routes/article.svelte";
	import Login from './routes/login.svelte';

	//Import Apollo
	import {
		ApolloClient,
		ApolloLink,
		HttpLink,
		InMemoryCache,
		from,
	} from "@apollo/client/core";
	import { onError } from "@apollo/client/link/error";
	import { setContext } from "@apollo/client/link/context";
	import { setClient } from "svelte-apollo";

	let screenReader = false;
	let route = "/login";
	let request = "";

	function routeLoading(event) {
		route = event.detail.route;
		let parsed = parse($querystring);
		request = parsed && "request" in parsed ? parsed.request : "";
	}

	push("/login"); // Go home
</script>

<main>
	{#if route !== "/login"}
		<div class="navbar">
			<div class="left flex">
				<Switch bind:checked={screenReader} />
				<span>Screen Reader</span>
			</div>

			{#if route !== "/home"}
				<div class="bar">
					<Bar search={request} />
				</div>
			{/if}		

			<div class="right flex">
				<div class="profile flex">
					<span>Bruno Silva</span>
					<img src="assets/user.png" alt="User" />
				</div>

				<span class="settings material-icons"></span>
			</div>
		</div>

	{/if}
	
	<div class="content">
		<Router
			on:routeLoading={routeLoading}
			routes={{
				"/home": wrap({
					component: Home,
				}),
				"/search": wrap({
					component: Search
				}),
				"/article/:id": wrap({
					component: Article
				}),
				"/login": wrap({
					component: Login
				})
			}}
		/>
	</div>
</main>


<style>
	main {
		display: flex;
		flex-direction: column;
		background-color: #f9f9f9;
		height: 100%;
	}
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0px 30px;
		padding-top: 20px;
	}

	.bar {
		max-width: 600px;
		width: 100%;
		margin-top: 5px;
	}

	.left span {
		margin-left: 20px;
	}

	.right img {
		margin-left: 20px;
		width: 45px;
	}

	main {
		height: 100%;
		background-color: #f9f9f9;
		display: flex;
		flex-direction: column;
	}

	.content {
		overflow-y: auto;
		flex: 1;
	}

	.settings {
		display: none;
	}

	@media only screen and (max-width: 500px) {
		.profile {
			display: none;
		}

		.settings {
			display: block;
			font-size: 30px;
		}
	}
</style>