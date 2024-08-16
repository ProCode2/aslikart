<script lang="ts">
	import { browser } from '$app/environment';
	import { cart } from '$lib/stores/cart';
	import { logout } from '$lib/stores/user';

	export let mobile = false;
	let loggedIn: string | null;
	if (browser) {
		loggedIn = window.localStorage.getItem('__token');
	}
</script>

<nav class="grow w-full">
	<h3 class="uppercase font-semibold text-sm pl-2 mb-2 text-slate-500">
		Main
	</h3>
	<ul class="w-full flex flex-col space-y-2">
		<a href="/cart">
			<li
				class="flex justify-start items-center gap-4 p-2 hover:bg-slate-200 hover:shadow rounded"
			>
				<i
					class="relative fa-solid fa-cart-shopping bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
				>
					{#if Object.keys($cart.cart).length > 0}
						<span
							class="w-5 h-5 flex justify-center items-center rounded-full text-white text-[10px] bg-[#edcf5d] absolute top-0 -right-2"
							>{Object.keys($cart.cart).length}</span
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
	</ul>
	<h3 class="uppercase font-semibold text-sm pl-2 mb-2 text-slate-500">
		Profile
	</h3>
	<ul class="w-full flex flex-col space-y-2">
		{#if loggedIn}
			<a
				href="#"
				on:click={(e) => {
					e.stopPropagation();
					e.preventDefault();
					logout();
					window.localStorage.removeItem('__token');
					window.location.href = '/login';
				}}
			>
				<li
					class="flex justify-start items-center gap-4 p-2 hover:bg-slate-200 hover:shadow rounded"
				>
					<i
						class="relative fa-solid fa-right-from-bracket bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
					>
					</i>
					<span
						class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base font-thin uppercase`}
						>Logout</span
					>
				</li>
			</a>
		{:else}
			<a href="/login">
				<li
					class="flex justify-start items-center gap-4 p-2 hover:bg-slate-200 hover:shadow rounded"
				>
					<i
						class="relative fa-solid fa-right-to-bracket bg-slate-900 w-10 h-10 text-sm text-white hover:shadow-md hover:bg-slate-700 rounded-full flex justify-center items-center"
					>
					</i>
					<span
						class={`${mobile ? 'inline' : 'hidden md:inline'} text-sm sm:text-base font-thin uppercase`}
						>Login</span
					>
				</li>
			</a>
		{/if}
	</ul>
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
</nav>
