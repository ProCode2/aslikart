<script lang="ts">
	import CartItem from '../../components/CartItem.svelte';
	import { cart } from '$lib/stores/cart';
	import type { Product } from '$lib/types';
	let loading = false;
	async function getProductById(productId: number) {
		const res = await fetch('https://dummyjson.com/products/' + productId);
		const productData = await res.json();
		return productData;
	}
	let products: Product[] = [];
	loading = true;
	Promise.all(
		Object.keys($cart.cart).map((id) => getProductById(parseInt(id)))
	).then((ps: Product[]) => {
		products = ps;
		loading = false;
	});
	let totalSum = 0;
	$: {
		totalSum = products.reduce((acc, cur) => {
			let quantity = $cart.cart[cur.id.toString()]?.quantity ?? 0;
			acc += quantity * cur.price;

			return acc;
		}, 0);
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

		{#each products as product (product.id)}
			<CartItem
				{product}
				quantity={$cart.cart[product.id.toString()]?.quantity ?? 0}
			/>
		{/each}
		<div
			class="h-full w-full p-2 border border-slate-300 rounded-md flex justify-between items-center"
		>
			<div class="flex w-2/3 flex-col justify-center items-start">
				<img
					class="w-[120px] h-[120px] rounded-md shadow"
					src=""
					alt="product"
				/>
				<h2 class="font-bold poppins font-thin uppercase mt-2">
					SOme big product
				</h2>
				<p class="text-xs mt-2 mb-4 text-slate-500">
					The Essence Mascara Lash Princess is a popular mascara known
					for its volumizing and lengthening effects. Achieve dramatic
					lashes with this long-lasting and cruelty-free formula.
				</p>
			</div>
			<div class="flex w-1/3 flex-col items-end h-full mb-auto space-y-4">
				<div class="flex space-x-2">
					<button
						class="text-sm py-2 px-3 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
					>
						<i
							class="fa-solid hover:text-slate-700 fa-plus text-slate-500"
						></i>
					</button>
					<input
						class="text-sm p-2 w-8 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
						type="text"
					/>
					<button
						class="text-sm py-2 px-3 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
					>
						<i
							class="fa-solid hover:text-slate-700 fa-minus text-slate-500"
						></i>
					</button>
				</div>
				<button
					class="text-sm py-2 px-3 border border-slate-500 hover:shadow-md rounded-md hover:border-slate-900 hover:text-slate-900"
				>
					<i
						class="fa-solid hover:text-slate-700 fa-trash text-slate-500"
					></i>
				</button>
			</div>
		</div>
		<hr class="w-full" />
		<div class="w-full flex justify-between my-2">
			<p class="font-semibold text-slate-500">Subtotal</p>
			<p class="font-bold">${totalSum}</p>
		</div>
		<div class="w-full flex justify-between my-2">
			<p class="font-semibold text-slate-500">Subtotal</p>
			<p>---</p>
		</div>

		<hr class="w-full" />
		<div class="w-full flex justify-between my-2">
			<p class="font-semibold text-slate-500">Total</p>
			<p class="font-bold">${totalSum}</p>
		</div>
		<button
			class="!mt-8 w-full h-12 text-center text-white rounded-md bg-slate-900 hover:bg-slate-700"
			>Order</button
		>
	</div>
</div>
