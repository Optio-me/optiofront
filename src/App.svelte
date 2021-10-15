<script lang="ts">
	import Router, { location, push, querystring } from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import { parse } from "qs";
	import UrlParser from 'query-string';

	//Import Components
	import Bar from './components/search_bar.svelte';
	import Switch from "./components/switch.svelte";

	//Import routes
	import Home from "./routes/home.svelte";
	import Search from "./routes/search.svelte";
	import Article from "./routes/article.svelte";
	import Login from './routes/login.svelte';
	import Settings from './routes/settings.svelte';
	import ErrorPage from "./routes/error.svelte";

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

	//Import Auth
	import {
		logout,
		protectAuth,
		protectLogin,
		validateToken,
	} from "./auth/auth";

	import { Storage } from "@capacitor/storage";

	let screenReader = false;
	let route = "/login";
	let request = "";
	let user = null;
	let image;

	const authLink = setContext(async (_, { headers }) => {
		const token = await Storage.get({ key: "access_token" });
		
		return {
			headers: {
				...headers,
				Authorization: token ? token.value : "",
			},
		};
	});

	const errorLink = onError(
		({ graphQLErrors, response }) => {
			if (graphQLErrors) {
				for (let err of graphQLErrors) {
					if (err.path[0] == "articleSearch") {
						return (response.errors = null);
					}
				}
			}
		}
	);

	const additiveLink = from([
		errorLink,
		authLink,
		ApolloLink.from([
			new HttpLink({
				uri: `${process.env.BACK_ADDR}/graphql`,
				credentials: "same-origin",
				fetchOptions: {
					mode: "cors",
				},
			}),
		]),
	]);

	const client = new ApolloClient(<any>{
		link: additiveLink,
		cache: new InMemoryCache(),
	});

	setClient(client);
	location.subscribe((route: string) => {
		if (route == "/") {
			let qs = "?" + window.location.href.split("?")[1];
			let obj = UrlParser.parse(qs);
			if (obj.code) {
				validateToken(obj).then((res) => {
					window.location.href = "/#/home";
				});
			} else {
				push("/home");
			}
		}
	});

	const conditionsFailed = (event) => {
		if (event.detail.location == "/login") {
			push("/home");
		} else {
			push("/login");
		}
	};

	function routeLoading(event) {
		route = event.detail.route;
		let parsed = parse($querystring);
		request = parsed && "request" in parsed ? parsed.request : "";
	}

	const getUser = async () => {
		const session = await Storage.get({ key: "session" });
		const token = await Storage.get({ key: "access_token" });
		
		let customUser = JSON.parse(session.value);
		user = customUser;

		await fetch("https://graph.microsoft.com/beta/me/photo/$value", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token.value,
			},
		})
			.then(async (response) => {
				let src = URL.createObjectURL(await response.blob()); 
				image = src;

				await Storage.set({key: 'profilePic', value: src});
			})
			.catch((customUser.picture = null));
	};

	getUser();
</script>

<main>
	{#if !["/login", "/settings"].includes(route)}
		<div class="navbar">

			{#if route === "/home"}
				<div class="left flex">
					<Switch bind:checked={screenReader} />
				</div>
			{:else}
				<img on:click={() => push("/home")} class="logo flex" src="assets/logo.svg" alt="Optio.me Logo"/>
			{/if}	

			{#if route !== "/home"}
				<div class="bar">
					<Bar search={request} />
				</div>
			{/if}		

			<div class="right flex">
				<div on:click={() => push("#/settings")} class="profile flex">
					<span class="noselect">{user ? user.displayName: "John Doe"}</span>
					<img id="profilePic" src={image ? image: "assets/user.png"} alt="User" />
				</div>

				<span class="settings material-icons"></span>
			</div>
		</div>

	{/if}

	<div class="content">
		<Router
			on:conditionsFailed={conditionsFailed}
			on:routeLoading={routeLoading}
			routes={{
				"/home": wrap({
					component: Home,
					conditions: [protectAuth]
				}),
				"/search": wrap({
					component: Search,
					conditions: [protectAuth]
				}),
				"/article/:id": wrap({
					component: Article,
					conditions: [protectAuth]
				}),
				"/settings": wrap({
					component: Settings,
					conditions: [protectAuth]
				}),
				"/login": wrap({
					component: Login,
					conditions: [protectLogin]
				}),
				"/error/:type": wrap({
					component: ErrorPage
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

	.right img {
		margin-left: 16px;
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

	#profilePic {
		border-radius: 50%;
		width: 35px;
	}

	.profile {
		background-color: #F6F6F6;
		padding: 3px 10px 3px 20px;
		border-radius: 30px;
		border: 2px solid #BABABA;
	}

	.logo {
		width: 180px;
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