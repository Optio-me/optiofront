<script lang="ts">
	interface params {
		type: string
	}
	export let params: params = {} as params;

	const DEFAULT_ERRS = {
		"err" : "Something went wrong. If this message persists please contact a member of the administration team.",
		"Disconnected" : "The Optio server is currently unavailable. Please press home or report the issue if this message persists."
	};
</script>

<main class="flex errorLayout">
	<div class="flex messageArea">
		<h1>{params.type}.</h1>
		<p>{DEFAULT_ERRS[params.type] ? DEFAULT_ERRS[params.type] : "Something went wrong."}</p>
		<button on:click={() => window.location.href ="/#/"} class="homeBtn">Home</button>
	</div>
</main>


<style>
	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.errorLayout {
		height: 100%;
	}

	.messageArea {
		margin: 0.5rem;
		flex-direction: column;
		box-sizing: border-box;
		color: white;
		text-align: center;
	}

	.messageArea p {
		margin-top: 0;
		width: 100%;
		max-width: 22rem;
	}

	.homeBtn {
		all: unset;
		width: 100%;
		border-radius: 28px;
		background: #B791CB;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>