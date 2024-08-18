<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let type = 'error';
	export let dismissible = true;
	let alertClassNames = '';
	if (type === 'success') {
		alertClassNames = 'bg-green-100 text-green-800';
	} else if (type === 'error') {
		alertClassNames = 'bg-red-100 text-red-800';
	} else {
		alertClassNames = 'bg-blue-100 text-blue-800';
	}
</script>

<article
	class={`${alertClassNames} alert flex items-center p-4 rounded-md flex items-center justify-center`}
	role="alert"
	transition:fade
>
	{#if type === 'success'}
		<i class="fa-solid fa-check-circle text-green-500"></i>
	{:else if type === 'error'}
		<i class="fa-solid fa-times-circle text-red-500"></i>
	{:else}
		<i class="fa-solid fa-info-circle text-blue-500"></i>
	{/if}

	<div class="ml-4 flex-grow mr-2">
		<slot />
	</div>

	{#if dismissible}
		<button
			class="ml-auto text-white bg-transparent border-0 p-0"
			on:click={() => dispatch('dismiss')}
		>
			<i class="fa-solid fa-times text-slate-700 text-xl"></i>
		</button>
	{/if}
</article>
