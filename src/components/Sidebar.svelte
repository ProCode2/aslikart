<script>
	import Navbar from './Navbar.svelte';
</script>

<aside
	class="absolute left-0 hidden md:flex flex-col justify-start items-start gap-4 w-30 md:w-[250px] h-screen border-r border-slate-300 shadow-lg"
>
	<div class="w-full border-b border-slate-300 py-3">
		<h3
			class="text-2xl text-slate-900 font-thin tracking-wider uppercase cursor-pointer mt-4 max-w-max ml-2"
		>
			<i class="fa fa-store"></i>
			AsliKart
		</h3>
	</div>

	<Navbar />
</aside>
