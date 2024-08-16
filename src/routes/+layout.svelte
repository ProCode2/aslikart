<script>
	import '../app.css';
	import MobileSidebar from '../components/MobileSidebar.svelte';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<main class="h-screen min-h-0">
	<Sidebar />
	<MobileSidebar />
	<div class="h-full overflow-y-scroll md:ml-[250px]">
		<slot />
	</div>
</main>
