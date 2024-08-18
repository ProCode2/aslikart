<script lang="ts">
	import Toast from './Toast.svelte';
	import { dismissToast, toasts } from '$lib/stores/toast';
</script>

{#if $toasts}
	<section class="fixed inset-x-0 top-0 flex flex-col items-center mt-4 z-50">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => toast.id && dismissToast(toast.id)}
				>{toast.message}</Toast
			>
		{/each}
	</section>
{/if}
