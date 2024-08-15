<script lang="ts">
	import { cart } from '$lib/stores/cart';

	export let mobile = false;
</script>

<nav class="grow w-full h-full">
	<h3 class="uppercase font-semibold text-sm pl-2 mb-2 text-slate-500">
		Main
	</h3>
	<ul class="w-full h-full flex flex-col space-y-2">
		<a href="#">
			<li
				class="flex justify-start items-center gap-4 px-2 hover:bg-slate-200 hover:shadow rounded"
			>
				<i
					class="relative fa-solid fa-cart-shopping bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
				>
					{#if $cart.length > 0}
						<span
							class="w-5 h-5 flex justify-center items-center rounded-full text-white text-[10px] bg-[#edcf5d] absolute top-0 -right-2"
							>{$cart.length}</span
						>
					{/if}
				</i>
				<span
					class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base font-thin uppercase`}
					>Cart</span
				>
			</li>
		</a>
		<a href="#">
			<li
				class="flex justify-start items-center gap-4 p-2 hover:bg-slate-200 hover:shadow rounded"
			>
				<i
					class="fa-solid fa-bag-shopping bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
				></i>
				<span
					class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base font-thin uppercase`}
					>orders</span
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
					class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base font-thin uppercase`}
					>User</span
				>
			</li>
		</a>
		<h3 class="uppercase font-semibold text-sm pl-2 mb-2 text-slate-500">
			Information
		</h3>
		<ul class="w-full h-full flex flex-col space-y-2">
			<a href="#">
				<li
					class="flex justify-start items-center gap-4 px-2 hover:bg-slate-200 hover:shadow rounded"
				>
					<i
						class="fa-solid fa-network-wired bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
					></i>
					<span
						class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base font-thin uppercase`}
						>API</span
					>
				</li>
			</a>
		</ul>
	</ul>
</nav>
