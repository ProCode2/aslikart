import type { Product } from '$lib/types';
import { writable } from 'svelte/store';

export const cart = writable<Product[]>([]);

export function addToCart(item: Product) {
	cart.update((items) => {
		return [...items, item];
	});
}

export function removeFromCart(itemId: number) {
	cart.update((items) => {
		return items.filter((item) => item.id !== itemId);
	});
}

export function clearCart() {
	cart.set([]);
}
