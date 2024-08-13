<script lng="ts">
	import Sheet from './Sheet.svelte';

	let open = false;
</script>

<div class="md:hidden sticky top-0 z-30 w-full bg-white/50 backdrop-blur-md">
	<div
		class="dotted-gradient z-30 mx-auto flex h-16 w-full max-w-[1420px] items-center justify-between px-4 py-2 lg:px-2"
	>
		<h3
			class="bg-slate-900 text-white p-3 rounded-lg hover:shadow-lg cursor-pointer text-base"
		>
			<i class="fa-solid fa-store"></i>
			<span class="poppins">AK</span>
		</h3>
		<div class="">
			<Sheet bind:open>
				<button
					slot="opener"
					id="sheetOpener"
					on:click={() => {
						open = !open;
					}}
					class="bg-slate-900 hover:bg-slate-700 hover:scale-105 transition-all ease-in-out text-white p-3 rounded-lg hover:shadow-lg cursor-pointer text-base"
				>
					<svg
						id="sheetOpener"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect width="18" height="18" x="3" y="3" rx="2" />
						<path d="M9 3v18" />
					</svg>
				</button>
				<div slot="content">Hello there</div>
			</Sheet>
		</div>
	</div>
</div>

<style>
	.dotted-gradient {
		background-image: radial-gradient(
			circle at center,
			rgba(82, 92, 105, 0.4) 1px,
			transparent 0
		);
		background-position: bottom;
		background-size: 6px 3px;
		background-repeat: repeat-x;
	}
</style>
