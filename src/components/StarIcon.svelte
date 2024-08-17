<script lang="ts">
	export let rating: number = 0;
	export let maxStars: number = 5;
	export let className: string = 'w-5 h-5';

	// Generate an array representing the filled state of each star
	let stars = Array.from({ length: maxStars }, (_, i) => {
		if (i < Math.floor(rating)) {
			return 'full';
		} else if (i < rating) {
			return 'half';
		} else {
			return 'empty';
		}
	});
</script>

<div class="flex items-center">
	{#each stars as star}
		<svg
			class={`${className} ${
				star === 'full'
					? 'fill-[#edcf5d] stroke-[#edcf5d]'
					: star === 'half'
						? 'fill-[#edcf5d] stroke-[#edcf5d] opacity-50'
						: 'stroke-[#edcf5d]'
			}`}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polygon
				points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
			/>
		</svg>
	{/each}
	<span class="ml-1 text-slate-900">{rating.toFixed(1)}</span>
</div>
