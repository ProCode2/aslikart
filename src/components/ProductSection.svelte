<!-- This is the mean of the product show case, this should be tailored to handle all the product showcase logic the site has to offer,
so that this becomes resuable and can be used to show - all products, searched products, specific categoru products tailored for experience and filtered products -->
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

	// change product diplay whenever baseUrl changes (used in searching for product)
	const debounce = (productFecther: (lm: number, sk: number) => void) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			productFecther(limit, skip);
		}, 750);
	};

	let timer: number; // use to debounce product fetching
	$: {
		if (baseUrl) {
			debounce(getAllProducts);
		}
	}
</script>

<div class="rounded-md text-slate-900 my-4 mx-2 p-2 border rounded-md">
	<div class="flex justify-between items-center px-2 my-4 text-slate-900">
		<h2
			class="mb-4 text-sm md:text-2xl font-semibold tracking-wider uppercase font-thin"
		>
			{heading}
		</h2>
		{#if paginated}
			<div class="mt-3 pr-4 text-xs">
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
						<span class="font-semibold text-gray-900">{total}</span>
						Entries
					</span>
					<div
						class="inline-flex mt-2 xs:mt-0 text-xs sm:text-sm md:text-base"
					>
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
	{#if loading}
		<div class="flex h-72 w-screen items-center justify-center">
			<div class="flex flex-col items-center gap-4">
				<div
					class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
				/>
				<p class="text-primary">Loading Products</p>
			</div>
		</div>
	{:else if products.length === 0}
		<div
			class="w-full mr-2 bg-slate-200 text-slate-700 font-bold text-xl grow h-72 flex justify-center items-center"
		>
			No products found
		</div>
	{:else}
		<div
			class={scroll
				? 'overflow-x-scroll overflow-y-hidden flow no-wrap flex gap-4 w-full'
				: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:auto-cols-max gap-4'}
		>
			{#each products as product (product.id)}
				<a class="max-w-max" href={`/product/${product.id}`}>
					<ProductItem {product} />
				</a>
			{/each}
		</div>
	{/if}
</div>
