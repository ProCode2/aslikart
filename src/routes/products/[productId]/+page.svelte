<script lang="ts">
	import StarIcon from '../../../components/StarIcon.svelte';
	import { page } from '$app/stores';
	import type { Product } from '$lib/types';
	import { onMount } from 'svelte';
	import ImageDisplay from '../../../components/ImageDisplay.svelte';
	import { browser } from '$app/environment';
	import { addToCart } from '$lib/stores/cart';
	import { addToast } from '$lib/stores/toast';

	let loading = false;

	let product: Product;
	async function getProductById(productId: number) {
		const res = await fetch('https://dummyjson.com/products/' + productId);
		const productData = await res.json();
		return productData;
	}

	onMount(() => {
		loading = true;
		let pid = $page.params.productId;
		getProductById(parseInt(pid)).then((p) => {
			product = p;
			loading = false;
		});
	});
</script>

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
{#if product}
	<div
		class="mx-4 grid grid-cols-1 gap-8 py-12 md:grid-cols-2 md:gap-16 md:py-24"
	>
		<ImageDisplay images={product.images} thumbnail={product.thumbnail} />
		<div>
			<h3 class="mb-1 font-medium">{product.title}</h3>
			<span class="font-thind tex-xl tracking-wider uppercase"
				>Essence</span
			>
			<p class="text-sm font-medium text-slate-500 mt-4 mb-4">
				{product.description}
			</p>
			<p class="mb-2">
				<span class="font-semibold">Category:</span><span class="ml-2"
					>{product.category}</span
				>
			</p>

			<p class="">
				<span class="w-full mb-1">${product.price}</span>
				<span
					class="font-semibold border p-1 rounded-md ml-2 text-sm bg-green-500 text-white"
					>Discount:
					<span class="ml-2">{product.discountPercentage}%</span>
				</span>
			</p>
			<p class="flex items-center mt-4">
				<StarIcon rating={product.rating} />
			</p>
			<p class="text-red-500">{product.stock} left in stock</p>
			<button
				class="py-2 px-8 text-white rounded-md hover:shadow-md cursor-pointer hover:bg-slate-700 bg-slate-900 hover:scale-110 transition-all ease-in-out delay-350 mt-8"
				on:click={(e) => {
					e.stopPropagation();
					e.preventDefault();
					if (browser) {
						addToCart({ productId: product.id, quantity: 1 });
						addToast({
							message: 'Added to cart',
							type: 'success'
						});
					}
				}}>Add to cart</button
			>
		</div>
		<div class="flex flex-col items-start gap-4 ml-4">
			<h2 class="text-2xl font-bold tracking-tight">Reviews</h2>
			{#each product.reviews as review}
				<div class="grid gap-4 text-sm leading-loose">
					<div class="grid gap-4">
						<div class="flex gap-4 items-start">
							<div class="grid gap-0.5 text-sm">
								<h3 class="font-semibold">
									{review.reviewerName}
								</h3>
								<time class="text-sm text-muted-foreground"
									>{new Date(review.date).toLocaleString(
										'en-US'
									)}</time
								>
							</div>
							<div class="flex items-center gap-0.5 ml-auto">
								<StarIcon rating={review.rating} />
							</div>
						</div>
						<div
							class="text-sm leading-loose text-muted-foreground"
						>
							<p>
								{review.comment}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
