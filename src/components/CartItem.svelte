<script lang="ts">
	import { browser } from '$app/environment';
	import { addToCart, removeFromCart } from '$lib/stores/cart';
	import type { Product } from '$lib/types';

	export let quantity: number;
	export let product: Product;
	// sync input value to cart to store
	function addInputToCart(e: Event) {
		const el = e.target as HTMLInputElement;
		let q = parseInt(el.value);
		if (q === 0) {
			removeFromCart(q);
		} else {
			addToCart({
				productId: product.id,
				quantity: q
			});
		}
	}
</script>

{#if product}
	<div
		class="h-full w-full p-2 border border-slate-300 rounded-md flex justify-between items-center"
	>
		<div class="flex w-2/3 flex-col justify-center items-start">
			<img
				class="w-[120px] h-[120px] rounded-md shadow"
				src={product.thumbnail}
				alt="product"
			/>
			<h2 class="font-bold poppins font-thin uppercase mt-2">
				{product.title}
			</h2>
			<p class="text-xs mt-2 mb-4 text-slate-500">
				{product.description}
			</p>
		</div>
		<div class="flex w-1/3 flex-col items-end h-full mb-auto space-y-4">
			<div class="flex space-x-2">
				<button
					on:click={() => {
						if (browser) {
							if (quantity - 1 === 0) {
								removeFromCart(product.id);
							} else {
								addToCart({
									productId: product.id,
									quantity: quantity - 1
								});
							}
						}
					}}
					class="text-sm py-2 px-3 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
				>
					<i
						class="fa-solid hover:text-slate-700 fa-minus text-slate-500"
					></i>
				</button>
				<input
					class="text-sm p-2 w-8 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
					type="text"
					value={quantity}
					on:change={addInputToCart}
				/>
				<button
					on:click={() => {
						if (browser) {
							if (quantity + 1 === 0) {
								removeFromCart(product.id);
							} else {
								addToCart({
									productId: product.id,
									quantity: quantity + 1
								});
							}
						}
					}}
					class="text-sm py-2 px-3 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
				>
					<i
						class="fa-solid hover:text-slate-700 fa-plus text-slate-500"
					></i>
				</button>
			</div>
			<button
				on:click={() => {
					if (browser) {
						removeFromCart(product.id);
					}
				}}
				class="text-sm py-2 px-3 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
			>
				<i class="fa-solid hover:text-slate-700 fa-trash text-slate-500"
				></i>
			</button>
		</div>
	</div>
{/if}
