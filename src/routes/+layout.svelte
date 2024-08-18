<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import '../app.css';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import MobileSidebar from '$lib/components/navigation/MobileSidebar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import Toasts from '$lib/components/ui/Toast/Toasts.svelte';

	const unsubscribe = page.subscribe(() => {
		if (browser) {
			const loggedIn = window.localStorage.getItem('__token');

			if (!$page.url.href.endsWith('/login') && !loggedIn) {
				window.location.href = '/login';
			}
		}
	});

	onDestroy(() => unsubscribe());
</script>

<Toasts />
<main class="h-screen min-h-0">
	<Sidebar />
	<MobileSidebar />
	<div class="h-full overflow-y-scroll md:ml-[250px]">
		<slot />
		<Footer />
	</div>
</main>
