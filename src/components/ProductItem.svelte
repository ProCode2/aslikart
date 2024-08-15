<script lang="ts">
	import type { Product } from '$lib/types';
	import { addToCart } from '$lib/stores/cart';
	export let product: Product;
</script>

<div
	class="relative hover:scale-105 transition-all ease-in-out delay-350 p-4 text-center overflow-hidden group w-[150px] md:w-[250px] min-h-[270px] md:h-[340px] flex flex-col justify-center items-center bg-[#f2f0ea] shadow-md rounded-md"
>
	<img
		class="rounded-md w-[130px] md:w-[200px] h-[150px] md:h-[200px] object-cover"
		src={product.thumbnail}
		alt="product"
	/>
	<p class="font-semibold poppins font-thin uppercase mt-2">
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
					e.stopPropagation();
					e.preventDefault();
					addToCart(product);
				}}
			>
				add to cart
			</button>
		</div>
	</div>
</div>
