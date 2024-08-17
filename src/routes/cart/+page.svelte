<script lang="ts">
	import CartItem from '../../components/CartItem.svelte';
	import { cart, clearCart } from '$lib/stores/cart';
	import type { Product } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import { addToast } from '$lib/stores/toast';
	let loading = false;
	async function getProductById(productId: number) {
		const res = await fetch('https://dummyjson.com/products/' + productId);
		const productData = await res.json();
		return productData;
	}
	let products: Product[] = [];
	let totalSum = 0;
	loading = true;

	// remove products whose identity has been decremented to 0 by the user
	async function updateProducts() {
		products = products.filter(
			(p) => $cart.cart.get(p.id.toString())?.quantity
		);
	}
	const unsubscribe = cart.subscribe(() => {
		updateProducts();
	});
	onDestroy(() => {
		unsubscribe();
	});

	// load product details of items present in cart
	onMount(async () => {
		loading = true;
		const productIds = [...$cart.cart.keys()].map((id) => parseInt(id));
		products = await Promise.all(
			productIds.map((id) => getProductById(id))
		);
		loading = false;
	});

	// simulate sending order
	function handleSubmitOrder() {
		addToast({
			message: 'Successfully placed your order'
		});
		clearCart();
		window.location.href = '/';
	}

	// calculate total cart price
	$: {
		totalSum = parseFloat(
			products
				.reduce((acc, cur) => {
					let quantity =
						$cart.cart.get(cur.id.toString())?.quantity ?? 0;
					acc += quantity * cur.price;

					return acc;
				}, 0)
				.toFixed(2)
		);
	}
</script>

<div class="min-h-screen w-full pt-6 px-4">
	<h2
		class="mb-4 text-sm md:text-2xl font-semibold tracking-wider uppercase font-thin"
	>
		Your cart items
	</h2>
	<div
		class="flex flex-col justify-center items-center w-full px-2 py-4 space-y-4 max-w-3xl mx-auto"
	>
		{#if loading}
			<div class="flex h-72 w-screen items-center justify-center">
				<div class="flex flex-col items-center gap-4">
					<div
						class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
					/>
					<p class="text-primary">Loading Products</p>
				</div>
			</div>
		{/if}
		{#if Array.from($cart.cart.keys()).length === 0}
			<div
				class="bg-slate-300 text-slate-700 font-bold w-full h-full py-8 px-2 flex items-center justify-center"
			>
				No products here yet.
			</div>
		{/if}
		{#each products as product (product.id)}
			<CartItem
				{product}
				quantity={$cart.cart.get(product.id.toString())?.quantity ?? 0}
			/>
		{/each}
		<hr class="w-full" />
		<div class="w-full flex justify-between my-2">
			<p class="font-semibold text-slate-500">Subtotal</p>
			<p class="font-bold">${totalSum}</p>
		</div>
		<div class="w-full flex justify-between my-2">
			<p class="font-semibold text-slate-500">Shipping</p>
			<p>---</p>
		</div>

		<hr class="w-full" />
		<div class="w-full flex justify-between my-2">
			<p class="font-semibold text-slate-500">Total</p>
			<p class="font-bold">${totalSum}</p>
		</div>
		<button
			on:click={handleSubmitOrder}
			disabled={Array.from($cart.cart.keys()).length === 0}
			class="!mt-8 w-full h-12 text-center text-white rounded-md bg-slate-900 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed"
			>Order</button
		>
	</div>
</div>
