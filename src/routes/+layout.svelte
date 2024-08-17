<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import MobileSidebar from '../components/MobileSidebar.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Toasts from '../components/Toast/Toasts.svelte';
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
