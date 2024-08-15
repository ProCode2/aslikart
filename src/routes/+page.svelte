<script>
	import Footer from '../components/Footer.svelte';
	import ProductSection from '../components/ProductSection.svelte';
	let searchText = '';
</script>

<div class="h-screen md:pl-[250px] overflow-y-scroll">
	<div
		class="w-full py-6 px-4 flex justify-center md:justify-end items-center"
	>
		<div class="w-[350px] space-y-3">
			<form class="relative">
				<input
					bind:value={searchText}
					type="text"
					id="hs-validation-name-success"
					name="hs-validation-name-success"
					class="py-3 px-4 block w-full border-slate-500 rounded-lg text-sm focus:border-slate-900 focus:outline-0 focus:ring-0 border border-slate-300"
					aria-describedby="hs-validation-name-success-helper"
					placeholder="Search for a product"
				/>
				<div
					class="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3"
				>
					<i
						class="fa-solid fa-magnifying-glass shrink-0 size-4 text-slate-500"
					></i>
				</div>
			</form>
		</div>
	</div>
	<section>
		<div class="p-2">
			{#if searchText}
				<ProductSection
					heading={`Showing search results for "${searchText}"`}
					baseUrl={'https://dummyjson.com/products/search?q=' +
						searchText}
				/>
			{/if}
			<ProductSection paginated />
			<ProductSection
				scroll
				baseUrl="https://dummyjson.com/products/category/smartphones"
				heading="We heard you were talking about buying a phone?"
			/>
		</div>
	</section>
	<Footer />
</div>
