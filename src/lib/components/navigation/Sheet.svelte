<script lang="ts">
	import { fly } from 'svelte/transition';
	export let open: boolean;
	let sheetWidth: number;
	let sheet: HTMLDivElement;
	function onWindowClick(e: MouseEvent) {
		let el = e.target as HTMLDivElement;
		if (
			(sheet && !sheet.contains(e.target as Node)) ||
			el.id == 'sheet-overlay'
		) {
			open = false;
		}
	}
</script>

<svelte:window on:click={onWindowClick} />
<div bind:this={sheet}>
	<slot name="opener" />
	{#if open}
		<div
			id="sheet-overlay"
			class="absolute left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-40"
		>
			<div
				bind:clientWidth={sheetWidth}
				class="shadow-lg min-w-40 max-w-[80vw] w-full h-screen bg-white p-2 border-r border-slate-300"
				transition:fly={{
					x: -1 * sheetWidth,
					opacity: 1,
					duration: 350
				}}
			>
				<div class="ml-auto mb-4">
					<button on:click={() => (open = false)}>
						<i class="fa-solid fa-xmark text-slate-900 text-xl"></i>
					</button>
				</div>
				<slot name="content" />
			</div>
		</div>
	{/if}
</div>
