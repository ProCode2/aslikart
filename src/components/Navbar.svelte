<script lang="ts">
	export let mobile = false;
</script>

<nav class="grow w-full h-full">
	<ul class="w-full h-full flex flex-col space-y-4">
		<a href="#">
			<li
				class="flex justify-start items-center gap-4 p-2 hover:bg-slate-200 hover:shadow rounded"
			>
				<i
					class="fa-solid fa-cart-shopping bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
				></i>
				<span
					class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base`}
					>Cart</span
				>
			</li>
		</a>
		<a href="#">
			<li
				class="flex justify-start items-center gap-4 p-2 hover:bg-slate-200 hover:shadow rounded"
			>
				<i
					class="fa-solid fa-user bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
				></i>
				<span
					class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base`}
					>User</span
				>
			</li>
		</a>
	</ul>
</nav>
