<script lang="ts">
	export let images: string[] = [];
	export let thumbnail: string = '';

	// The currently selected image, initially set to the thumbnail
	let selectedImage = thumbnail;

	// Function to update the selected image
	function selectImage(image: string) {
		selectedImage = image;
	}
</script>

<div class="flex flex-col justify-center items-center">
	<img
		src={selectedImage}
		alt="Selected"
		width={600}
		height={600}
		class="mx-auto aspect-square w-full max-w-[400px] rounded-lg object-cover border rounded-md"
	/>

	<div class="mt-2 w-full flex justify-center items-center space-x-2">
		{#each images as img (img)}
			<button on:click={() => selectImage(img)}>
				<img
					src={img}
					alt="Thumbnail"
					width={100}
					height={100}
					class="aspect-square w-full max-w-[100px] rounded-lg object-cover border rounded-md cursor-pointer transition-transform transform hover:scale-105 {selectedImage ===
					img
						? 'border-2 border-blue-500'
						: ''}"
				/>
			</button>
		{/each}
	</div>
</div>
