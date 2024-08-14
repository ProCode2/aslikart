<script lang="ts">
	import type { Product } from '$lib/types';
	import ProductItem from './ProductItem.svelte';
	export let baseUrl = 'https://dummyjson.com/products';
	export let limit = 10;
	export let skip = 0;
	export let paginated = false;
	export let heading = 'All Products';
	export let total = 0;
	export let scroll = false;
	let url = '';
	// loading while fetching products
	let loading = false;
	let products: Product[] = [];
	// fetch paginated products
	async function getAllProducts(lm: number, sk: number) {
		loading = true;

		try {
			if (paginated) {
				url = `${baseUrl}?limit=${lm}&skip=${sk}`;
			} else {
				url = baseUrl;
			}
			const res = await fetch(url);
			const productsData = await res.json();
			console.log(productsData.products);
			products = productsData.products;
			total = productsData.total;
			skip = productsData.skip;
			limit = productsData.limit;
			loading = false;
		} catch (err) {
			loading = false;
			console.error(err);
		}
	}

	// load initial products
	getAllProducts(limit, skip);
</script>

<div class="rounded-md w-full text-slate-900 my-4 mx-2">
	<div class="flex justify-between items-center px-2 my-4 text-slate-900">
		<h2 class="mb-4 text-2xl font-semibold tracking-wider">
			{heading}
		</h2>
	</div>
	<div
		class={scroll
			? 'overflow-x-scroll overflow-y-hidden flow no-wrap flex gap-4'
			: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:auto-cols-max gap-4'}
	>
		{#if loading}
			<p>Loading Products</p>
		{:else}
			{#each products as product (product.id)}
				<a class="max-w-max" href={`/product/${product.id}`}>
					<ProductItem {product} />
				</a>
			{/each}
		{/if}
	</div>
	{#if paginated}
		<div class="mt-3 pr-4">
			<div class="ml-auto flex flex-col items-end text-slate-600">
				<span class="text-sm text-gray-700 dark:text-gray-400">
					Showing <span class="font-semibold text-gray-900"
						>{skip + 1}</span
					>
					to
					<span class="font-semibold text-gray-900"
						>{Math.min(skip + limit, total)}</span
					>
					of
					<span class="font-semibold text-gray-900">{total}</span> Entries
				</span>
				<div class="inline-flex mt-2 xs:mt-0">
					<button
						on:click={() => {
							skip -= limit;
							getAllProducts(limit, skip);
						}}
						disabled={skip == 0}
						class="flex items-center disabled:bg-slate-400 justify-center px-3 h-8 text-sm font-medium rounded-s bg-slate-700 text-white hover:bg-slate-900"
					>
						Prev
					</button>
					<button
						on:click={() => {
							skip = Math.min(skip + limit, total);
							getAllProducts(limit, skip);
						}}
						disabled={skip >= total}
						class="flex items-center disabled:bg-slate-400 justify-center px-3 h-8 text-sm font-medium text-white bg-slate-700 border-0 border-s border-slate-700 rounded-e hover:bg-slate-900"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
