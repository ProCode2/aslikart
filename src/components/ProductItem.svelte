<script lang="ts">
	import type { Product } from '$lib/types';
	import { addToCart } from '$lib/stores/cart';
	import { user } from '$lib/stores/user';
	import { browser } from '$app/environment';
	import { addToast } from '$lib/stores/toast';
	let loading = false;
	export let product: Product;
	// store cart data in the server
	async function addItemInCart() {
		console.log($user);
		if (!$user) return;
		const userId = $user.id;
		if (!userId) return;
		const cartId = window.localStorage.getItem('__asliCart');
		try {
			if (cartId) {
				fetch('https://dummyjson.com/carts/' + cartId, {
					method: 'PUT' /* or PATCH */,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						merge: true, // this will include existing products in the cart
						products: [
							{
								id: product.id,
								quantity: 1
							}
						]
					})
				});
			} else {
				const res = await fetch('https://dummyjson.com/carts/add', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						userId,
						products: [
							{
								id: product.id,
								quantity: 1
							}
						]
					})
				});
				const cartData = await res.json();
				window.localStorage.setItem('__asliCart', cartData.id);
			}
			addToCart({
				productId: product.id,
				quantity: 1
			});
		} catch (err) {
			console.error('Something went wront', err);
		}
	}
</script>

<div
	class="relative hover:scale-105 transition-all ease-in-out delay-350 p-4 text-center overflow-hidden group w-[150px] md:w-[250px] min-h-[270px] md:h-[340px] flex flex-col justify-center items-center bg-[#f2f0ea] shadow-md rounded-md"
>
	<img
		class="rounded-md w-[130px] md:w-[200px] h-[150px] md:h-[200px] object-cover"
		src={product.thumbnail}
		alt="product"
	/>
	<p class="font-bold poppins font-thin uppercase mt-2">
		{product.title}
	</p>
	<p class="font-mono">$ {product.price}</p>
	<p class="text-sm bg-green-600 text-white rounded-md shadow p-1">
		{product.discountPercentage}% off
	</p>
	<div
		class="w-full bg-[#a4a4a4] p-2 flex justify-center md:justify-between items-center md:absolute bottom-0 left-0 transform md:translate-y-20 mt-2 flex-wrap group-hover:translate-y-0 transition-all delay-350 ease-in-out"
	>
		<div>
			<p class="flex items-center">
				<span class="mr-1 text-white">{product.rating}</span>
				<i class="fa-solid fa-star text-[#edcf5d]"></i>
			</p>
		</div>
		<div class="">
			<button
				class="text-xs p-2 bg-slate-900 hover:bg-slate-700 text-white rounded-md hover:shadow-md hover:scale-105 transition-all ease-in-out delay-350"
				on:click={(e) => {
					loading = true;
					e.stopPropagation();
					e.preventDefault();
					if (browser) {
						addToCart({ productId: product.id, quantity: 1 });
						addToast({
							message: 'Added to cart',
							type: 'success'
						});
					}
					loading = false;
				}}
			>
				<span>add to cart</span>
				{#if loading}
					<div
						class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
					/>
				{/if}
			</button>
		</div>
	</div>
</div>
