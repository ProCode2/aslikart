<script>
	import Footer from '../components/Footer.svelte';
	import ProductSection from '../components/ProductSection.svelte';

	async function getAllProducts() {
		const res = await fetch(
			'https://dummyjson.com/products/category/beauty?limit=2'
		);
		const productsData = await res.json();
		console.log(productsData.products);
	}
	getAllProducts();
</script>

<div class="h-screen md:pl-[250px] overflow-y-scroll">
	<section>
		<div class="p-2">
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
