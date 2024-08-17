import type { Toast } from '$lib/types';
import { writable } from 'svelte/store';

export const toasts = writable<Toast[]>([]);

export const addToast = (toast: Toast) => {
	const id = Math.floor(Math.random() * 10000);

	const defaults: Toast = {
		id,
		type: 'info',
		dismissible: true,
		timeout: 3000,
		message: ''
	};

	toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
