<script lang="ts">
	import type { User } from '$lib/types';
	import { login } from '$lib/stores/user';
	let username = '';
	let password = '';
	let loading = false;
	async function loginUser() {
		loading = true;
		try {
			const res = await fetch('https://dummyjson.com/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					password,
					expiresInMins: 30 // optional, defaults to 60
				})
			});
			const userData: User = await res.json();
			login(userData);
			window.localStorage.setItem('__token', userData.token);
			window.location.href = '/';
		} catch (err) {
			console.error(err);
		}
		loading = false;
	}
</script>

<div class="flex min-h-full flex-col justify-center px-6 pt-4 pb-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<div class="text-center text-3xl">
			<i class="fa-solid fa-store"></i>
		</div>
		<h2
			class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
		>
			Login to your account
		</h2>
	</div>

	<div class="mt-4 md:mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" on:submit={() => loginUser()}>
			<div>
				<label
					for="username"
					class="block text-sm font-medium leading-6 text-gray-900"
					>User name</label
				>
				<div class="mt-2">
					<input
						bind:value={username}
						id="username"
						name="username"
						type="text"
						required
						class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label
						for="password"
						class="block text-sm font-medium leading-6 text-gray-900"
						>Password</label
					>
				</div>
				<div class="mt-2">
					<input
						bind:value={password}
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex mr-2 w-full justify-center items-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
				>
					<span>Login</span>
					{#if loading}
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
						/>
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
