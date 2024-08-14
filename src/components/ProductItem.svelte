<script lang="ts">
	import type { Product } from '$lib/types';

	export let product: Product;
</script>

<div
	class="hover:scale-105 transition-all ease-in-out delay-350 p-4 text-center w-[150px] md:w-[250px] h-[270px] md:h-[340px] flex flex-col justify-center items-center bg-[#f2f0ea] shadow-md rounded-md"
>
	<img
		class="rounded-md w-[130px] md:w-[200px] object-cover"
		src={product.thumbnail}
		alt="product"
	/>
	<p class="font-semibold poppins">{product.title}</p>
	<p class="font-mono">$ {product.price}</p>
	<p class="text-sm bg-green-600 text-white rounded-md shadow p-1">
		{product.discountPercentage}% off
	</p>
</div>
