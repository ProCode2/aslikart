<script lang="ts">
	import { fly } from 'svelte/transition';
	export let open: boolean;
	let sheetWidth: number;
	let sheet: HTMLDivElement;
	function onWindowClick(e: MouseEvent) {
		console.log(e);
		if (sheet && !sheet.contains(e.target as Node)) {
			console.log(sheet);
			open = false;
		}
	}
</script>

<svelte:window on:click={onWindowClick} />
<div bind:this={sheet}>
	<slot name="opener" />
	{#if open}
		<div
			bind:clientWidth={sheetWidth}
			class="min-w-40 max-w-[80vw] w-full h-screen bg-white p-2 absolute z-40 border-r border-slate-300 left-0 top-0"
			transition:fly={{ x: -1 * sheetWidth, opacity: 1, duration: 350 }}
		>
			<div class="ml-auto">
				<button on:click={() => (open = false)}>
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
			<slot name="content" />
		</div>
	{/if}
</div>
