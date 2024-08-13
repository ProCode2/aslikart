<script>
	import '../app.css';
	import MobileSidebar from '../components/MobileSidebar.svelte';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<main class="relative">
	<Sidebar />
	<MobileSidebar />
	<slot />
</main>
